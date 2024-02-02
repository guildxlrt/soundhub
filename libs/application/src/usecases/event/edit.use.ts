import { ErrorHandler, ErrorMsg, envs, filePath, htmlError } from "Shared"
import { EditEventUsecaseParams, UsecaseReply } from "../../utils"
import { ArtistsService, EventsService, StorageService } from "../../services"

export class EditEventUsecase {
	private mainService: EventsService
	private storageService?: StorageService
	private artistService?: ArtistsService

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

			if (envs.backend && this.storageService && this.artistService)
				return await this.backend(input, this.storageService, this.artistService)
			else if (envs.backend && !this.storageService) throw new ErrorMsg("services error")
			else return await this.frontend(input)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async frontend(input: EditEventUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { event, file } = input

			const data = await this.mainService.edit(event, file)
			return new UsecaseReply<boolean>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async backend(
		input: EditEventUsecaseParams,
		storageService: StorageService,
		artistService: ArtistsService
	): Promise<UsecaseReply<boolean>> {
		try {
			const { file, event, delImage } = input
			const { owner_id, id } = input.event

			// owner verification
			const eventOwner = await this.mainService.getOwner(id as number)
			if (owner_id !== eventOwner) throw ErrorMsg.htmlError(htmlError[403])

			// validate
			await event.validateArtistArray(artistService)

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

			return new UsecaseReply<boolean>(true)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
