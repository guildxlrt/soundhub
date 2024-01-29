import { CreateEventReplyDTO, ErrorHandler, ErrorMsg, filePath } from "Shared"
import { EventUsecaseParams } from "../../assets"
import { Event, File, StorageRepository } from "Domain"
import { EventsService } from "../../services"

export class CreateEventUsecase {
	private eventsService: EventsService
	private storageRepository?: StorageRepository

	constructor(eventsService: EventsService, storageRepository?: StorageRepository) {
		this.eventsService = eventsService
		this.storageRepository = storageRepository
	}

	async execute(input: EventUsecaseParams): Promise<CreateEventReplyDTO> {
		try {
			const { file } = input
			const { owner_id, title, text, date, place, artists } = input.data
			const data = new Event(null, owner_id, date, place, artists, title, text, null)

			if (this.storageRepository) {
				return await this.backend(this.storageRepository, data, file)
			} else return await this.frontend(data, file)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(event: Event, file?: File): Promise<CreateEventReplyDTO> {
		try {
			const data = await this.eventsService.create(event, file)
			return new CreateEventReplyDTO(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		storageRepository: StorageRepository,
		event: Event,
		file?: File
	): Promise<CreateEventReplyDTO> {
		try {
			if (file) {
				// move
				const newImagePath = await storageRepository.move(file, filePath.store.announce)
				if (!newImagePath) throw new ErrorMsg(`Error: failed to store`)
				event.updateImagePath(newImagePath)
			}

			// persist
			const data = await this.eventsService.create(event)
			return new CreateEventReplyDTO(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
