import { CreateReleaseReplyDTO, ErrorHandler, ErrorMsg, filePath, htmlError } from "Shared"
import { NewReleaseUsecaseParams } from "../../assets"
import { ReleasesService } from "../../services"
import { Song, StorageRepository } from "Domain"

export class CreateReleaseUsecase {
	private releasesService: ReleasesService
	private storageRepository?: StorageRepository

	constructor(releasesService: ReleasesService, storageRepository?: StorageRepository) {
		this.releasesService = releasesService
		this.storageRepository = storageRepository
	}

	async execute(input: NewReleaseUsecaseParams): Promise<CreateReleaseReplyDTO> {
		try {
			if (this.storageRepository) {
				return await this.backend(this.storageRepository, input)
			} else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: NewReleaseUsecaseParams): Promise<CreateReleaseReplyDTO> {
		try {
			const { songs, release } = input
			const { cover, data } = release

			const res = await this.releasesService.create({ data: data, cover }, songs)
			return new CreateReleaseReplyDTO(res)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		storageRepository: StorageRepository,
		input: NewReleaseUsecaseParams
	): Promise<CreateReleaseReplyDTO> {
		try {
			const { songs, release } = input
			const { cover, data } = release
			const { owner_id, id } = data

			// owner verification
			const releaseOwner = await this.releasesService.getOwner(id as number)
			if (owner_id !== releaseOwner) throw ErrorMsg.htmlError(htmlError[403])

			// CREATE FOLDER RELEASE
			const newFolder = await storageRepository.mkdir()
			if (!newFolder) throw new ErrorMsg(`Error: failed to store`)

			// AUDIOFILE
			const songsData: Song[] = await Promise.all(
				songs.map(async (song) => {
					const { audio } = song

					// STORING SONGS
					const audioPath = await storageRepository.move(audio, newFolder)

					// return data
					song.data.updateAudioPath(audioPath)
					return song.data
				})
			)

			if (cover) {
				// move
				const newImagePath = await storageRepository.move(cover, filePath.store.release)
				if (!newImagePath) throw new ErrorMsg(`Error: failed to store`)
				data.updateCoverPath(newImagePath)
			}

			// persist
			const res = await this.releasesService.create(data, songsData)
			return new CreateReleaseReplyDTO(res)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
