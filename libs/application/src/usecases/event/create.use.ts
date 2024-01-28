import { CreateEventReplyDTO, ErrorMsg, ReplyLayer, filePath } from "Shared"
import { EventUsecaseParams } from "../../assets"
import { Event, File, StorageRepository } from "Domain"
import { EventsService } from "../../services"

export class CreateEventUsecase {
	eventsService: EventsService
	storageRepository?: StorageRepository

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
			return new CreateEventReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}

	async backend(storageRepository: StorageRepository, data: Event, file?: File) {
		try {
			// STORING NEW FILE
			if (file) {
				// move
				const newImagePath = await storageRepository.move(file, filePath.store.announce)

				// save
				data.imagePath = newImagePath
				await this.eventsService.create(data)

				return new ReplyLayer<boolean>(true)
			} else {
				return await this.eventsService.create(data)
			}
		} catch (error) {
			return new CreateEventReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}

	async frontend(data: Event, file?: File) {
		try {
			return await this.eventsService.create(data, file)
		} catch (error) {
			return new CreateEventReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
