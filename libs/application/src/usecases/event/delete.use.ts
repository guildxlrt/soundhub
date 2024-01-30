import { ErrorHandler, ErrorMsg, htmlError } from "Shared"
import { EventsService, StorageService } from "../../services"
import { DeleteEventUsecaseParams, Reply } from "../../assets"

export class DeleteEventUsecase {
	private eventsService: EventsService
	private storageService?: StorageService

	constructor(eventsService: EventsService, storageService?: StorageService) {
		this.eventsService = eventsService
		this.storageService = storageService
	}
	async execute(input: DeleteEventUsecaseParams): Promise<Reply<boolean>> {
		try {
			if (this.storageService) return await this.backend(this.storageService, input)
			else return await this.frontend(input)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async frontend(input: DeleteEventUsecaseParams): Promise<Reply<boolean>> {
		try {
			const { id } = input

			const res = await this.eventsService.delete(id)
			return new Reply<boolean>(res)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async backend(
		storageService: StorageService,
		input: DeleteEventUsecaseParams
	): Promise<Reply<boolean>> {
		try {
			const { id, ownerID } = input

			// owner verification
			const eventOwner = await this.eventsService.getOwner(id as number)
			if (ownerID !== eventOwner) throw ErrorMsg.htmlError(htmlError[403])

			// DELETE OLD FILE
			const imagePath = await this.eventsService.getImagePath(id as number)
			await storageService.delete(imagePath as string)

			// persist
			const res = await this.eventsService.delete(id)
			return new Reply<boolean>(res)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
