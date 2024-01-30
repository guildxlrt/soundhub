import { ErrorHandler, ErrorMsg, htmlError } from "Shared"
import { AnnouncesService, StorageService } from "../../services"
import { DeleteAnnounceUsecaseParams, Reply } from "../../assets"

export class DeleteAnnounceUsecase {
	private announcesService: AnnouncesService
	private storageService?: StorageService

	constructor(announcesService: AnnouncesService, storageService?: StorageService) {
		this.announcesService = announcesService
		this.storageService = storageService
	}
	async execute(input: DeleteAnnounceUsecaseParams): Promise<Reply<boolean>> {
		try {
			if (this.storageService) return await this.backend(this.storageService, input)
			else return await this.frontend(input)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async frontend(input: DeleteAnnounceUsecaseParams): Promise<Reply<boolean>> {
		try {
			const { id } = input

			const res = await this.announcesService.delete(id)
			return new Reply<boolean>(res)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async backend(
		storageService: StorageService,
		input: DeleteAnnounceUsecaseParams
	): Promise<Reply<boolean>> {
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
			return new Reply<boolean>(res)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
