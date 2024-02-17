import { ErrorHandler, ErrorMsg, envs, filePath } from "Shared"
import { UsecaseReply } from "../../utils"
import { AnnouncesService, StorageService } from "../../services"
import { NewAnnounceUsecaseParams } from "../../adapters"

export class CreateAnnounceUsecase {
	private mainService: AnnouncesService
	private storageService?: StorageService

	constructor(mainService: AnnouncesService, storageService?: StorageService) {
		this.mainService = mainService
		this.storageService = storageService
	}

	async execute(input: NewAnnounceUsecaseParams): Promise<UsecaseReply<boolean>> {
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

	async frontend(input: NewAnnounceUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { file, announce } = input
			const data = await this.mainService.create(announce, file)
			return new UsecaseReply<boolean>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		input: NewAnnounceUsecaseParams,
		storageService: StorageService
	): Promise<UsecaseReply<boolean>> {
		try {
			const { file, announce } = input

			// STORING NEW FILE
			if (file) {
				// move
				const newImagePath = await file.move(storageService, filePath.store.announce)
				announce.updateImagePath(newImagePath)
			}

			// persist
			await this.mainService.create(announce)

			return new UsecaseReply<boolean>(true, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
