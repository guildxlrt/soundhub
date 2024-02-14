import { ErrorHandler, ErrorMsg, envs, filePath, htmlError } from "Shared"
import { UsecaseReply } from "../../utils"
import { ReleasesService, StorageService } from "../../services"
import { NewReleaseUsecaseParams } from "../../adapters"

export class CreateReleaseUsecase {
	private mainService: ReleasesService
	private storageService?: StorageService

	constructor(mainService: ReleasesService, storageService?: StorageService) {
		this.mainService = mainService
		this.storageService = storageService
	}

	async execute(input: NewReleaseUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { cover, data } = input
			cover?.validateImage()
			data.sanitize(true)
			data.validateReleaseType()

			if (envs.backend && this.storageService)
				return await this.backend(input, this.storageService)
			else if (envs.backend && !this.storageService) throw new ErrorMsg("services error")
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: NewReleaseUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { cover, data } = input

			const res = await this.mainService.create({ data: data, cover })
			return new UsecaseReply(res, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		input: NewReleaseUsecaseParams,
		storageService: StorageService
	): Promise<UsecaseReply<boolean>> {
		try {
			const { cover, data, artistsIDs } = input
			const { publisher_id, id } = data

			// publisher verification
			const releaseOwner = await this.mainService.getOwner(id as number)
			if (publisher_id !== releaseOwner) throw ErrorMsg.htmlError(htmlError[403])

			// CREATE RELEASE FOLDER
			const newFolder = await storageService.mkdir()
			if (!newFolder) throw new ErrorMsg(`Error: failed to store`)
			data.updateFolderPath(newFolder)

			// persist
			const res = await this.mainService.create({
				release: data,
				artists: artistsIDs,
			})

			// STORING NEW FILE
			if (cover) {
				// move
				const filename = "cover.webp"
				const path = filePath.store.release + newFolder
				await cover.move(storageService, path, filename)
			}

			return new UsecaseReply<boolean>(res, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
