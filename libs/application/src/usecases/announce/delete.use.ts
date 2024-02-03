import { ErrorHandler, ErrorMsg, envs, htmlError } from "Shared"
import { AnnouncesService, StorageService } from "../../services"
import { DeleteAnnounceUsecaseParams, UsecaseReply } from "../../utils"

export class DeleteAnnounceUsecase {
	private announcesService: AnnouncesService
	private storageService?: StorageService

	constructor(announcesService: AnnouncesService, storageService?: StorageService) {
		this.announcesService = announcesService
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

			const res = await this.announcesService.delete(id)
			return new UsecaseReply<boolean>(res)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		input: DeleteAnnounceUsecaseParams,
		storageService: StorageService
	): Promise<UsecaseReply<boolean>> {
		try {
			const { id, ownerID } = input

			// owner verification
			const announceOwner = await this.announcesService.getOwner(id as number)
			if (ownerID !== announceOwner) throw ErrorMsg.htmlError(htmlError[403])

			// DELETE OLD FILE
			const imagePath = await this.announcesService.getImagePath(id as number)
			await storageService.delete(imagePath as string)

			// persist
			const res = await this.announcesService.delete(id)
			return new UsecaseReply<boolean>(res)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
