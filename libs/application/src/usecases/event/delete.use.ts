import { ErrorHandler, ErrorMsg, envs, htmlError } from "Shared"
import { EventsService, StorageService } from "../../services"
import { DeleteEventUsecaseParams, UsecaseReply } from "../../utils"

export class DeleteEventUsecase {
	private mainService: EventsService
	private storageService?: StorageService

	constructor(mainService: EventsService, storageService?: StorageService) {
		this.mainService = mainService
		this.storageService = storageService
	}
	async execute(input: DeleteEventUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			if (envs.backend && this.storageService)
				return await this.backend(input, this.storageService)
			else if (envs.backend && !this.storageService) throw new ErrorMsg("services error")
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: DeleteEventUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { id } = input

			const res = await this.mainService.delete(id)
			return new UsecaseReply<boolean>(res)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		input: DeleteEventUsecaseParams,
		storageService: StorageService
	): Promise<UsecaseReply<boolean>> {
		try {
			const { id, ownerID } = input

			// owner verification
			const eventOwner = await this.mainService.getOwner(id as number)
			if (ownerID !== eventOwner) throw ErrorMsg.htmlError(htmlError[403])

			// DELETE OLD FILE
			const imagePath = await this.mainService.getImagePath(id as number)
			await storageService.delete(imagePath as string)

			// persist
			const res = await this.mainService.delete(id)
			return new UsecaseReply<boolean>(res)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
