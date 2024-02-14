import { ErrorHandler, ErrorMsg, envs, filePath, htmlError } from "Shared"
import { UsecaseReply } from "../../utils"
import { RecordsService, StorageService } from "../../services"
import { NewRecordUsecaseParams } from "../../adapters"

export class CreateRecordUsecase {
	private mainService: RecordsService
	private storageService?: StorageService

	constructor(mainService: RecordsService, storageService?: StorageService) {
		this.mainService = mainService
		this.storageService = storageService
	}

	async execute(input: NewRecordUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { cover, data } = input
			cover?.validateImage()
			data.sanitize(true)
			data.validateRecordType()

			if (envs.backend && this.storageService)
				return await this.backend(input, this.storageService)
			else if (envs.backend && !this.storageService) throw new ErrorMsg("services error")
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: NewRecordUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { cover, data } = input

			const res = await this.mainService.create({ data: data, cover })
			return new UsecaseReply(res, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		input: NewRecordUsecaseParams,
		storageService: StorageService
	): Promise<UsecaseReply<boolean>> {
		try {
			const { cover, data, artistsIDs } = input
			const { publisher_id, id } = data

			// publisher verification
			const recordOwner = await this.mainService.getOwner(id as number)
			if (publisher_id !== recordOwner) throw ErrorMsg.htmlError(htmlError[403])

			// CREATE RELEASE FOLDER
			const newFolder = await storageService.mkdir()
			if (!newFolder) throw new ErrorMsg(`Error: failed to store`)
			data.updateFolderPath(newFolder)

			// persist
			const res = await this.mainService.create({
				record: data,
				artists: artistsIDs,
			})

			// STORING NEW FILE
			if (cover) {
				// move
				const filename = "cover.webp"
				const path = filePath.store.record + newFolder
				await cover.move(storageService, path, filename)
			}

			return new UsecaseReply<boolean>(res, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
