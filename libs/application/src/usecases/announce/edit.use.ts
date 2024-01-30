import { ErrorHandler, ErrorMsg, filePath, htmlError } from "Shared"
import { EditAnnounceParamsAdapter, Reply } from "../../assets"
import { AnnouncesService, StorageService } from "../../services"

export class EditAnnounceUsecase {
	private announcesService: AnnouncesService
	private storageService?: StorageService

	constructor(announcesService: AnnouncesService, storageService?: StorageService) {
		this.announcesService = announcesService
		this.storageService = storageService
	}

	async execute(input: EditAnnounceParamsAdapter): Promise<Reply<boolean>> {
		try {
			if (this.storageService) return await this.backend(this.storageService, input)
			else return await this.frontend(input)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async frontend(input: EditAnnounceParamsAdapter): Promise<Reply<boolean>> {
		try {
			const { file, announce } = input

			const data = await this.announcesService.edit(announce, file)
			return new Reply<boolean>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async backend(
		storageService: StorageService,
		input: EditAnnounceParamsAdapter
	): Promise<Reply<boolean>> {
		try {
			const { file, delImage, announce } = input
			const { owner_id, id } = announce

			// owner verification
			const announceOwner = await this.announcesService.getOwner(id as number)
			if (owner_id !== announceOwner) throw ErrorMsg.htmlError(htmlError[403])

			// persist
			await this.announcesService.edit(announce)

			// STORING NEW FILE
			// contradiction
			if (file && delImage === true)
				throw new ErrorMsg("User Image | contradictory request", 400)

			if (file || delImage === true) {
				const oldImagePath = await this.announcesService.getImagePath(id as number)
				if (!oldImagePath) new ErrorMsg(`Error: failed to persist`)

				if (file) {
					// move new
					const newImagePath = await file.move(storageService, filePath.store.announce)

					//move file
					await this.announcesService.setImagePath(newImagePath, id as number)
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
