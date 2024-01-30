import { ErrorHandler, ErrorMsg, filePath, htmlError } from "Shared"
import { EditEventParamsAdapter, Reply } from "../../assets"
import { Event, File } from "Domain"
import { EventsService, StorageService } from "../../services"

export class EditEventUsecase {
	private eventsService: EventsService
	private storageService?: StorageService

	constructor(eventsService: EventsService, storageService?: StorageService) {
		this.eventsService = eventsService
		this.storageService = storageService
	}

	async execute(input: EditEventParamsAdapter): Promise<Reply<boolean>> {
		try {
			if (this.storageService) return await this.backend(this.storageService, input)
			else return await this.frontend(input)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async frontend(input: EditEventParamsAdapter): Promise<Reply<boolean>> {
		try {
			const { event, file } = input

			const data = await this.eventsService.edit(event, file)
			return new Reply<boolean>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async backend(
		storageService: StorageService,
		input: EditEventParamsAdapter
	): Promise<Reply<boolean>> {
		try {
			const { file, event, delImage } = input
			const { owner_id, id } = input.event

			// owner verification
			const eventOwner = await this.eventsService.getOwner(id as number)
			if (owner_id !== eventOwner) throw ErrorMsg.htmlError(htmlError[403])

			// persist
			await this.eventsService.edit(event)

			// STORING NEW FILE
			// contradiction
			if (file && delImage === true)
				throw new ErrorMsg("User Image | contradictory request", 400)

			if (file || delImage === true) {
				const oldImagePath = await this.eventsService.getImagePath(id as number)
				if (!oldImagePath) new ErrorMsg(`Error: failed to persist`)

				if (file) {
					// move new
					const newImagePath = await file.move(storageService, filePath.store.event)

					//move file
					await this.eventsService.setImagePath(newImagePath, id as number)
				}

				// delete old
				await storageService.delete(oldImagePath as string)
			}

			return new Reply<boolean>(true)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
