import { EditReleaseParamsAdapter, Reply } from "../../assets"
import { ErrorHandler, ErrorMsg, filePath, htmlError } from "Shared"
import { ReleasesService, SongsService, StorageService } from "../../services"

export class EditReleaseUsecase {
	private releasesService: ReleasesService
	private storageService?: StorageService
	private songsService?: SongsService

	constructor(
		releasesService: ReleasesService,
		storageService?: StorageService,
		songsService?: SongsService
	) {
		this.releasesService = releasesService
		this.storageService = storageService
		this.songsService = songsService
	}

	async execute(input: EditReleaseParamsAdapter): Promise<Reply<boolean>> {
		try {
			if (this.storageService && this.songsService) {
				return await this.backend(this.storageService, this.songsService, input)
			} else return await this.frontend(input)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async frontend(input: EditReleaseParamsAdapter): Promise<Reply<boolean>> {
		try {
			const { songs, release } = input
			const { cover, data } = release

			const res = await this.releasesService.edit({ data: data, cover }, songs)
			return new Reply<boolean>(res)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async backend(
		storageService: StorageService,
		songsService: SongsService,
		input: EditReleaseParamsAdapter
	): Promise<Reply<boolean>> {
		try {
			const { songs, release, delCover } = input
			const { cover, data } = release
			const { owner_id, id } = data

			// owner verification
			const releaseOwner = await this.releasesService.getOwner(id as number)
			if (owner_id !== releaseOwner) throw ErrorMsg.htmlError(htmlError[403])

			// PERSIST
			// release
			await this.releasesService.edit(data)
			// songs
			songs.forEach(async (song) => {
				await songsService?.update(song)
			})

			// STORING NEW FILE
			// contradiction
			if (cover && delCover === true)
				throw new ErrorMsg("User Image | contradictory request", 400)

			if (cover || delCover === true) {
				const oldImagePath = await this.releasesService.getCoverPath(id as number)
				if (!oldImagePath) throw new ErrorMsg(`Error: failed to store`)

				if (cover) {
					// move new
					const newImagePath = await storageService.move(cover, filePath.store.release)

					// persist path
					await this.releasesService.setCoverPath(newImagePath, id as number)
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
