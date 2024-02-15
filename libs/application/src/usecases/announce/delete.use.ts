import { ErrorHandler, ErrorMsg, envs, htmlError } from "Shared"
import { AnnouncesService, StorageService } from "../../services"
import { UsecaseReply } from "../../utils"
import { DeleteAnnounceUsecaseParams } from "../../adapters"

export class DeleteAnnounceUsecase {
	private mainService: AnnouncesService
	private storageService?: StorageService

	constructor(mainService: AnnouncesService, storageService?: StorageService) {
		this.mainService = mainService
		this.storageService = storageService
	}
	async execute(input: DeleteAnnounceUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			if (envs.backend && this.storageService)
				return await this.backend(input, this.storageService)
			else if (envs.backend && !this.storageService) throw new ErrorMsg("services error")
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: DeleteAnnounceUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { id } = input

			const res = await this.mainService.delete(id)
			return new UsecaseReply<boolean>(res, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		input: DeleteAnnounceUsecaseParams,
		storageService: StorageService
	): Promise<UsecaseReply<boolean>> {
		try {
			const { id, authID } = input

			// auth verification
			const checkRights = await this.mainService.checkRights(id as number, authID as number)
			if (!checkRights) throw ErrorMsg.htmlError(htmlError[403])

			// DELETE OLD FILE
			const imagePath = await this.mainService.getImagePath(id as number)
			await storageService.delete(imagePath as string)

			// persist
			const res = await this.mainService.delete(id)
			return new UsecaseReply<boolean>(res, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
