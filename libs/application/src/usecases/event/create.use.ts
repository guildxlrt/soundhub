import { ErrorHandler, filePath } from "Shared"
import { NewEventUsecaseParams, Reply } from "../../assets"
import { EventsService, StorageService } from "../../services"

export class CreateEventUsecase {
	private eventsService: EventsService
	private storageService?: StorageService

	constructor(eventsService: EventsService, storageService?: StorageService) {
		this.eventsService = eventsService
		this.storageService = storageService
	}

	async execute(input: NewEventUsecaseParams): Promise<Reply<boolean>> {
		try {
			if (this.storageService) {
				return await this.backend(this.storageService, input)
			} else return await this.frontend(input)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async frontend(input: NewEventUsecaseParams): Promise<Reply<boolean>> {
		try {
			const { event, file } = input
			const data = await this.eventsService.create(event, file)
			return new Reply<boolean>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async backend(
		storageService: StorageService,
		input: NewEventUsecaseParams
	): Promise<Reply<boolean>> {
		try {
			const { event, file } = input

			if (file) {
				// move
				const newImagePath = await storageService.move(file, filePath.store.announce)
				event.updateImagePath(newImagePath)
			}

			// persist
			const data = await this.eventsService.create(event)
			return new Reply<boolean>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
