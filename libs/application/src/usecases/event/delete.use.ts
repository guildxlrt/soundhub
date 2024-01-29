import { ErrorHandler, ErrorMsg, htmlError } from "Shared"
import { EventsService } from "../../services"
import { StorageRepository } from "Domain"
import { DeleteEventUsecaseParams } from "../../assets"

export class DeleteEventUsecase {
	private eventsService: EventsService
	private storageRepository?: StorageRepository

	constructor(eventsService: EventsService, storageRepository?: StorageRepository) {
		this.eventsService = eventsService
		this.storageRepository = storageRepository
	}
	async execute(input: DeleteEventUsecaseParams) {
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
			return await this.eventsService.delete(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(storageRepository: StorageRepository, id: number, ownerID: number) {
		try {
			// owner verification
			const eventOwner = await this.eventsService.getOwner(id as number)
			if (ownerID !== eventOwner) throw ErrorMsg.htmlError(htmlError[403])

			// DELETE OLD FILE
			const imagePath = await this.eventsService.getImagePath(id as number)
			await storageRepository.delete(imagePath as string)

			// persist
			return await this.eventsService.delete(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
