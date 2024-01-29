import { EditReleaseUsecaseParams } from "../../assets"
import { EditReleaseReplyDTO, ErrorHandler, ErrorMsg, ReleaseFolder, htmlError } from "Shared"
import { ReleasesService, SongsService } from "../../services"
import { StorageRepository } from "Domain"

export class EditReleaseUsecase {
	private releasesService: ReleasesService
	private storageRepository?: StorageRepository
	private songsService?: SongsService

	constructor(
		releasesService: ReleasesService,
		storageRepository?: StorageRepository,
		songsService?: SongsService
	) {
		this.releasesService = releasesService
		this.storageRepository = storageRepository
		this.songsService = songsService
	}

	async execute(input: EditReleaseUsecaseParams): Promise<EditReleaseReplyDTO> {
		try {
			if (this.storageRepository && this.songsService) {
				return await this.backend(this.storageRepository, this.songsService, input)
			} else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: EditReleaseUsecaseParams): Promise<EditReleaseReplyDTO> {
		try {
			const { songs, release } = input
			const { cover, data } = release

			const res = await this.releasesService.edit({ data: data, cover }, songs)
			return new EditReleaseReplyDTO(res)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		storageRepository: StorageRepository,
		songsService: SongsService,
		input: EditReleaseUsecaseParams
	): Promise<EditReleaseReplyDTO> {
		try {
			const { songs, release } = input
			const { cover, data } = release
			const { owner_id, id } = data

			// owner verification
			const releaseOwner = await this.releasesService.getOwner(id as number)
			if (owner_id !== releaseOwner) throw ErrorMsg.htmlError(htmlError[403])

			if (cover) {
				const oldImagePath = await this.releasesService.getCoverPath(id as number)
				if (!oldImagePath) throw new ErrorMsg(`Error: failed to store`)

				// get realease folder
				const releaseFolderPath = ReleaseFolder.fromFullPath(oldImagePath)

				// move new
				const newImagePath = await storageRepository.move(cover, releaseFolderPath)

				// PERSIST
				// release
				data.updateCoverPath(newImagePath)
				await this.releasesService.edit(data)
				// songs
				songs.forEach(async (song) => {
					await songsService?.update(song)
				})

				// delete old
				await storageRepository.delete(oldImagePath)

				return new EditReleaseReplyDTO(true)
			} else {
				await this.releasesService.edit(data)

				// songs
				songs.forEach(async (song) => {
					await songsService?.update(song)
				})

				return new EditReleaseReplyDTO(true)
			}
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
