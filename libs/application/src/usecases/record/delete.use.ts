import { UsecaseReply } from "../../utils"
import { ErrorHandler, ErrorMsg, envs, htmlError } from "Shared"
import { RecordsService, StorageService } from "../../services"
import { PatchDeleteUsecaseParams } from "../../adapters"

export class DeleteRecordUsecase {
	private mainService: RecordsService
	private storageService?: StorageService

	constructor(mainService: RecordsService, storageService?: StorageService) {
		this.mainService = mainService
		this.storageService = storageService
	}

	async execute(input: PatchDeleteUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			if (envs.backend && this.storageService)
				return await this.backend(input, this.storageService)
			else if (envs.backend && !this.storageService) throw new ErrorMsg("services error")
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: PatchDeleteUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { id } = input

			const res = await this.mainService.delete(id)
			return new UsecaseReply<boolean>(res, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		input: PatchDeleteUsecaseParams,
		storageService: StorageService
	): Promise<UsecaseReply<boolean>> {
		try {
			const { id, ownerID } = input

			// publisher verification
			const recordOwner = await this.mainService.getOwner(id as number)
			if (ownerID !== recordOwner) throw ErrorMsg.htmlError(htmlError[403])

			// editability verification
			const isReadOnly = await this.mainService.getEditability(id as number)
			if (isReadOnly === true) throw ErrorMsg.htmlError(htmlError[403])

			// Delete Folder
			const recordFolder = await this.mainService.getFolderPath(id as number)
			await storageService.rmdir(recordFolder as string)

			// PERSIST
			await this.mainService.delete(id)

			return new UsecaseReply<boolean>(true, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
