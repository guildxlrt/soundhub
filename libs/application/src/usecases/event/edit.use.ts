import { EditEventReplyDTO, ErrorMsg, ReplyLayer, filePath, htmlError } from "Shared"
import { EventUsecaseParams } from "../../assets"
import { Event, File, StorageRepository } from "Domain"
import { EventsService } from "../../services"

export class EditEventUsecase {
	eventsService: EventsService
	storageRepository?: StorageRepository

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
			return new EditEventReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}

	async backend(storageRepository: StorageRepository, data: Event, file?: File) {
		try {
			const { owner_id, id } = data

			// owner verification
			const eventOwner = await this.eventsService.getOwner(id as number)
			if (owner_id !== eventOwner) throw ErrorMsg.htmlError(htmlError[403])

			// STORING NEW FILE
			if (file) {
				const oldImagePath = await this.eventsService.getImagePath(id as number)
				if (!oldImagePath) new ErrorMsg(`Error: failed to persist`)

				// move new
				const newImagePath = await storageRepository.move(file, filePath.store.event)

				data.imagePath = newImagePath
				await this.eventsService.edit(data)

				// delete old
				await storageRepository.delete(oldImagePath as string)

				return new ReplyLayer<boolean>(true)
			} else {
				return await this.eventsService.edit(data)
			}
		} catch (error) {
			return new EditEventReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}

	async frontend(data: Event, file?: File) {
		try {
			return await this.eventsService.edit(data, file)
		} catch (error) {
			return new EditEventReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
