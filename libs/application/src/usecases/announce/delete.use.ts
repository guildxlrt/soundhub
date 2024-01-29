import { ErrorHandler, ErrorMsg, htmlError } from "Shared"
import { AnnouncesService } from "../../services"
import { StorageRepository } from "Domain"
import { DeleteAnnounceUsecaseParams } from "../../assets"

export class DeleteAnnounceUsecase {
	private announcesService: AnnouncesService
	private storageRepository?: StorageRepository

	constructor(announcesService: AnnouncesService, storageRepository?: StorageRepository) {
		this.announcesService = announcesService
		this.storageRepository = storageRepository
	}
	async execute(input: DeleteAnnounceUsecaseParams) {
		try {
			const { id, ownerID } = input

			if (this.storageRepository)
				return await this.backend(this.storageRepository, id, ownerID as number)
			else return await this.frontend(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(id: number) {
		try {
			return await this.announcesService.delete(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(storageRepository: StorageRepository, id: number, ownerID: number) {
		try {
			// owner verification
			const announceOwner = await this.announcesService.getOwner(id as number)
			if (ownerID !== announceOwner) throw ErrorMsg.htmlError(htmlError[403])

			// DELETE OLD FILE
			const imagePath = await this.announcesService.getImagePath(id as number)
			await storageRepository.delete(imagePath as string)

			// persist
			return await this.announcesService.delete(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
