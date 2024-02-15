import { UsecaseReply } from "../../utils"
import { ErrorHandler, ErrorMsg, envs, htmlError } from "Shared"
import { RecordsService, StorageService } from "../../services"
import { DeleteRecordUsecaseParams } from "../../adapters"

export class DeleteRecordUsecase {
	private mainService: RecordsService
	private storageService?: StorageService

	constructor(mainService: RecordsService, storageService?: StorageService) {
		this.mainService = mainService
		this.storageService = storageService
	}

	async execute(input: DeleteRecordUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			if (envs.backend && this.storageService)
				return await this.backend(input, this.storageService)
			else if (envs.backend && !this.storageService) throw new ErrorMsg("services error")
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: DeleteRecordUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { id } = input

			const res = await this.mainService.delete(id)
			return new UsecaseReply<boolean>(res, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		input: DeleteRecordUsecaseParams,
		storageService: StorageService
	): Promise<UsecaseReply<boolean>> {
		try {
			const { id, authID } = input

			// auth verification
			const checkRights = await this.mainService.checkRights(id as number, authID as number)
			if (!checkRights) throw ErrorMsg.htmlError(htmlError[403])

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
