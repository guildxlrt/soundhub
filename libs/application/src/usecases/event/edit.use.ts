import { ErrorHandler, ErrorMsg, envs, filePath, htmlError } from "Shared"
import { UsecaseReply } from "../../utils"
import { EventsService, StorageService } from "../../services"
import { EditEventUsecaseParams } from "../../adapters"

export class EditEventUsecase {
	private mainService: EventsService
	private storageService?: StorageService

	constructor(mainService: EventsService, storageService?: StorageService) {
		this.mainService = mainService
		this.storageService = storageService
	}

	async execute(input: EditEventUsecaseParams): Promise<UsecaseReply<boolean>> {
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

	async frontend(input: EditEventUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { event, file } = input

			const data = await this.mainService.edit({ event, file })
			return new UsecaseReply<boolean>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		input: EditEventUsecaseParams,
		storageService: StorageService
	): Promise<UsecaseReply<boolean>> {
		try {
			const { file, event, delImage } = input
			const { organisator_id, id } = input.event

			// publisher verification
			const eventOwner = await this.mainService.getOwner(id as number)
			if (organisator_id !== eventOwner) throw ErrorMsg.htmlError(htmlError[403])

			// persist
			await this.mainService.edit(event)

			// STORING NEW FILE
			// contradiction
			if (file && delImage === true)
				throw new ErrorMsg("User Image | contradictory request", 400)

			if (file || delImage === true) {
				const oldImagePath = await this.mainService.getImagePath(id as number)
				if (!oldImagePath) new ErrorMsg(`Error: failed to persist`)

				if (file) {
					// move new
					const newImagePath = await file.move(storageService, filePath.store.event)

					//move file
					await this.mainService.setImagePath(newImagePath, id as number)
				}

				// delete old
				await storageService.delete(oldImagePath as string)
			}

			return new UsecaseReply<boolean>(true, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
