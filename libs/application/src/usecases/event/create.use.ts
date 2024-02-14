import { ErrorHandler, ErrorMsg, envs, filePath } from "Shared"
import { UsecaseReply } from "../../utils"
import { EventsService, StorageService } from "../../services"
import { NewEventUsecaseParams } from "../../adapters"

export class CreateEventUsecase {
	private mainService: EventsService
	private storageService?: StorageService

	constructor(mainService: EventsService, storageService?: StorageService) {
		this.mainService = mainService
		this.storageService = storageService
	}

	async execute(input: NewEventUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { file, event } = input
			// validate
			file?.validateImage()
			event.sanitize()

			if (envs.backend && this.storageService)
				return await this.backend(input, this.storageService)
			else if (envs.backend && !this.storageService) throw new ErrorMsg("services error")
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: NewEventUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { event, file, artists } = input
			const data = await this.mainService.create({ event, artists, file })
			return new UsecaseReply<boolean>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		input: NewEventUsecaseParams,
		storageService: StorageService
	): Promise<UsecaseReply<boolean>> {
		try {
			const { event, file, artists } = input

			if (file) {
				// move
				const newImagePath = await storageService.move(file, filePath.store.announce)
				event.updateImagePath(newImagePath)
			}

			// persist
			const data = await this.mainService.create({
				event: event,
				artists: artists,
			})
			return new UsecaseReply<boolean>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
