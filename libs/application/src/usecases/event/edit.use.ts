import { EditEventReplyDTO, ErrorHandler, ErrorMsg, filePath, htmlError } from "Shared"
import { EventUsecaseParams } from "../../assets"
import { Event, File, StorageRepository } from "Domain"
import { EventsService } from "../../services"

export class EditEventUsecase {
	private eventsService: EventsService
	private storageRepository?: StorageRepository

	constructor(eventsService: EventsService, storageRepository?: StorageRepository) {
		this.eventsService = eventsService
		this.storageRepository = storageRepository
	}

	async execute(input: EventUsecaseParams): Promise<EditEventReplyDTO> {
		try {
			const { file } = input
			const { owner_id, date, place, artists, title, text, id } = input.data

			const event = new Event(
				id as number,
				owner_id as number,
				date,
				place,
				artists,
				title,
				text,
				null
			)

			if (this.storageRepository)
				return await this.backend(this.storageRepository, event, file)
			else return await this.frontend(event, file)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(event: Event, file?: File): Promise<EditEventReplyDTO> {
		try {
			const data = await this.eventsService.edit(event, file)
			return new EditEventReplyDTO(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		storageRepository: StorageRepository,
		event: Event,
		file?: File
	): Promise<EditEventReplyDTO> {
		try {
			const { owner_id, id } = event

			// owner verification
			const eventOwner = await this.eventsService.getOwner(id as number)
			if (owner_id !== eventOwner) throw ErrorMsg.htmlError(htmlError[403])

			if (file) {
				const oldImagePath = await this.eventsService.getImagePath(id as number)
				if (!oldImagePath) new ErrorMsg(`Error: failed to persist`)

				// move new
				const newImagePath = await storageRepository.move(file, filePath.store.event)
				if (!newImagePath) throw new ErrorMsg(`Error: failed to store`)

				// persist
				event.updateImagePath(newImagePath)
				await this.eventsService.edit(event)

				// delete old
				await storageRepository.delete(oldImagePath as string)

				return new EditEventReplyDTO(true)
			} else {
				const data = await this.eventsService.edit(event)
				return new EditEventReplyDTO(data)
			}
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
