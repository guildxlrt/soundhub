import { UsecaseReply } from "../../utils"
import { ErrorHandler, ErrorMsg, envs, filePath, htmlError } from "Shared"
import { ReleasesService, StorageService } from "../../services"
import { EditReleaseUsecaseParams } from "../../adapters"

export class EditReleaseUsecase {
	private mainService: ReleasesService
	private storageService?: StorageService

	constructor(mainService: ReleasesService, storageService?: StorageService) {
		this.mainService = mainService
		this.storageService = storageService
	}

	async execute(input: EditReleaseUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { cover, data } = input
			cover?.validateImage()
			data.sanitize()
			data.validateReleaseType()

			if (envs.backend && this.storageService)
				return await this.backend(input, this.storageService)
			else if (envs.backend && !this.storageService) throw new ErrorMsg("services error")
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: EditReleaseUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { cover, data } = input

			const res = await this.mainService.edit({ data, cover })
			return new UsecaseReply<boolean>(res, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		input: EditReleaseUsecaseParams,
		storageService: StorageService
	): Promise<UsecaseReply<boolean>> {
		try {
			const { cover, data, delCover } = input
			const { publisher_id, id } = data

			// publisher verification
			const releaseOwner = await this.mainService.getOwner(id as number)
			if (publisher_id !== releaseOwner) throw ErrorMsg.htmlError(htmlError[403])

			// editability verification
			const isReadOnly = await this.mainService.getEditability(id as number)
			if (isReadOnly === true) throw ErrorMsg.htmlError(htmlError[403])

			// PERSIST
			// release
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
					const oldCoverPath = filePath.store.release + folderPath + oldCover
					await storageService.delete(oldCoverPath as string)

					// move new
					const newCover = "cover.webp"
					const newCoverPath = filePath.store.release + folderPath
					await storageService.move(cover, newCoverPath, newCover)
				}
			}

			return new UsecaseReply<boolean>(true, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
