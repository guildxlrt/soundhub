import { EditReleaseUsecaseParams, UsecaseReply } from "../../utils"
import { ErrorHandler, ErrorMsg, envs, filePath, htmlError } from "Shared"
import { ReleasesService, SongsService, StorageService } from "../../services"

export class EditReleaseUsecase {
	private mainService: ReleasesService
	private storageService?: StorageService
	private songsService?: SongsService

	constructor(
		mainService: ReleasesService,
		storageService?: StorageService,
		songsService?: SongsService
	) {
		this.mainService = mainService
		this.storageService = storageService
		this.songsService = songsService
	}

	async execute(input: EditReleaseUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { cover, data } = input.release
			cover?.validateImage()
			data.sanitize()
			data.validateReleaseType()

			if (envs.backend && this.storageService && this.songsService)
				return await this.backend(input, this.storageService, this.songsService)
			else if (envs.backend && (!this.storageService || !this.songsService))
				throw new ErrorMsg("services error")
			else return await this.frontend(input)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async frontend(input: EditReleaseUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { songs, release } = input
			const { cover, data } = release

			const res = await this.mainService.edit({ data: data, cover }, songs)
			return new UsecaseReply<boolean>(res)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async backend(
		input: EditReleaseUsecaseParams,
		storageService: StorageService,
		songsService: SongsService
	): Promise<UsecaseReply<boolean>> {
		try {
			const { songs, release, delCover } = input
			const { cover, data } = release
			const { owner_id, id } = data

			// owner verification
			const releaseOwner = await this.mainService.getOwner(id as number)
			if (owner_id !== releaseOwner) throw ErrorMsg.htmlError(htmlError[403])

			// PERSIST
			// release
			await this.mainService.edit(data)
			// songs
			songs.forEach(async (song) => {
				await songsService?.update(song)
			})

			// STORING NEW FILE
			// contradiction
			if (cover && delCover === true)
				throw new ErrorMsg("User Image | contradictory request", 400)

			if (cover || delCover === true) {
				const oldImagePath = await this.mainService.getCoverPath(id as number)
				if (!oldImagePath) throw new ErrorMsg(`Error: failed to store`)

				if (cover) {
					// move new
					const newImagePath = await storageService.move(cover, filePath.store.release)

					// persist path
					await this.mainService.setCoverPath(newImagePath, id as number)
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
