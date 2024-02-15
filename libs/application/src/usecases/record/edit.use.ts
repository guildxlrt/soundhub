import { UsecaseReply } from "../../utils"
import { ErrorHandler, ErrorMsg, envs, filePath, htmlError } from "Shared"
import { RecordsService, StorageService } from "../../services"
import { EditRecordUsecaseParams } from "../../adapters"

export class EditRecordUsecase {
	private mainService: RecordsService
	private storageService?: StorageService

	constructor(mainService: RecordsService, storageService?: StorageService) {
		this.mainService = mainService
		this.storageService = storageService
	}

	async execute(input: EditRecordUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { cover, data } = input
			cover?.validateImage()
			data.sanitize()

			if (envs.backend && this.storageService)
				return await this.backend(input, this.storageService)
			else if (envs.backend && !this.storageService) throw new ErrorMsg("services error")
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: EditRecordUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { cover, data } = input

			const res = await this.mainService.edit({ data, cover })
			return new UsecaseReply<boolean>(res, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		input: EditRecordUsecaseParams,
		storageService: StorageService
	): Promise<UsecaseReply<boolean>> {
		try {
			const { cover, data, delCover } = input
			const { createdBy, id } = data

			// auth verification
			const checkRights = await this.mainService.checkRights(
				id as number,
				createdBy as number
			)
			if (!checkRights) throw ErrorMsg.htmlError(htmlError[403])

			// PERSIST
			// record
			await this.mainService.edit(data)

			// STORING NEW FILE
			// contradiction
			if (cover && delCover === true)
				throw new ErrorMsg("User Image | contradictory request", 400)

			if (cover || delCover === true) {
				const folderPath = await this.mainService.getFolderPath(id as number)

				if (cover) {
					// delete old
					const oldCover = "cover.webp"
					const oldCoverPath = filePath.store.record + folderPath + oldCover
					await storageService.delete(oldCoverPath as string)

					// move new
					const newCover = "cover.webp"
					const newCoverPath = filePath.store.record + folderPath
					await storageService.move(cover, newCoverPath, newCover)
				}
			}

			return new UsecaseReply<boolean>(true, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
