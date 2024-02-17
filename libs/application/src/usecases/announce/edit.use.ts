import { ErrorHandler, ErrorMsg, envs, filePath, htmlError } from "Shared"
import { UsecaseReply } from "../../utils"
import { AnnouncesService, StorageService } from "../../services"
import { EditAnnounceUsecaseParams } from "../../adapters"

export class EditAnnounceUsecase {
	private mainService: AnnouncesService
	private storageService?: StorageService

	constructor(mainService: AnnouncesService, storageService?: StorageService) {
		this.mainService = mainService
		this.storageService = storageService
	}

	async execute(input: EditAnnounceUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { file, announce } = input
			// validate
			file?.validateImage()
			announce.sanitize()

			if (envs.backend && this.storageService)
				return await this.backend(input, this.storageService)
			else if (envs.backend && !this.storageService) throw new ErrorMsg("services error")
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: EditAnnounceUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { file, announce } = input

			const data = await this.mainService.edit(announce, file)
			return new UsecaseReply<boolean>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		input: EditAnnounceUsecaseParams,
		storageService: StorageService
	): Promise<UsecaseReply<boolean>> {
		try {
			const { file, delImage, announce } = input
			const { createdBy, id } = announce

			// auth verification
			const checkRights = await this.mainService.checkRights(
				id as number,
				createdBy as number
			)
			if (!checkRights) throw ErrorMsg.htmlError(htmlError[403])

			// persist
			await this.mainService.edit(announce)

			// STORING NEW FILE
			// contradiction
			if (file && delImage === true)
				throw new ErrorMsg("User Image | contradictory request", 400)

			if (file || delImage === true) {
				const oldImagePath = await this.mainService.getImagePath(id as number)
				if (!oldImagePath) new ErrorMsg(`Error: failed to persist`)

				if (file) {
					// move new
					const newImagePath = await file.move(storageService, filePath.store.announce)

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
