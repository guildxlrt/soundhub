import { ErrorHandler, filePath } from "Shared"
import { NewAnnounceUsecaseParams, Reply } from "../../assets"
import { AnnouncesService, StorageService } from "../../services"

export class CreateAnnounceUsecase {
	private announcesService: AnnouncesService
	private storageService?: StorageService

	constructor(announcesService: AnnouncesService, storageService?: StorageService) {
		this.announcesService = announcesService
		this.storageService = storageService
	}

	async execute(input: NewAnnounceUsecaseParams): Promise<Reply<boolean>> {
		try {
			if (this.storageService) {
				return await this.backend(this.storageService, input)
			} else return await this.frontend(input)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async frontend(input: NewAnnounceUsecaseParams): Promise<Reply<boolean>> {
		try {
			const { file, announce } = input
			const data = await this.announcesService.create(announce, file)
			return new Reply<boolean>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async backend(
		storageService: StorageService,
		input: NewAnnounceUsecaseParams
	): Promise<Reply<boolean>> {
		try {
			const { file, announce } = input

			// STORING NEW FILE
			if (file) {
				// move
				const newImagePath = await file.move(storageService, filePath.store.announce)
				announce.updateImagePath(newImagePath)
			}

			// persist
			await this.announcesService.create(announce)

			return new Reply<boolean>(true)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
