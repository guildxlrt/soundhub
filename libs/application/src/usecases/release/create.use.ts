import { ErrorHandler, ErrorMsg, filePath, htmlError } from "Shared"
import { NewReleaseUsecaseParams, Reply } from "../../assets"
import { ReleasesService, StorageService } from "../../services"
import { Song } from "Domain"

export class CreateReleaseUsecase {
	private releasesService: ReleasesService
	private storageService?: StorageService

	constructor(releasesService: ReleasesService, storageService?: StorageService) {
		this.releasesService = releasesService
		this.storageService = storageService
	}

	async execute(input: NewReleaseUsecaseParams): Promise<Reply<boolean>> {
		try {
			if (this.storageService) {
				return await this.backend(this.storageService, input)
			} else return await this.frontend(input)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async frontend(input: NewReleaseUsecaseParams): Promise<Reply<boolean>> {
		try {
			const { songs, release } = input
			const { cover, data } = release

			const res = await this.releasesService.create({ data: data, cover }, songs)
			return new Reply(res)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async backend(
		storageService: StorageService,
		input: NewReleaseUsecaseParams
	): Promise<Reply<boolean>> {
		try {
			const { songs, release } = input
			const { cover, data } = release
			const { owner_id, id } = data

			// owner verification
			const releaseOwner = await this.releasesService.getOwner(id as number)
			if (owner_id !== releaseOwner) throw ErrorMsg.htmlError(htmlError[403])

			// CREATE FOLDER RELEASE
			const newFolder = await storageService.mkdir()
			if (!newFolder) throw new ErrorMsg(`Error: failed to store`)

			// AUDIOFILE
			const songsData: Song[] = await Promise.all(
				songs.map(async (song) => {
					const { audio } = song

					// STORING SONGS
					const audioPath = await storageService.move(audio, newFolder)

					// return data
					song.data.setAudioPath(audioPath)
					return song.data
				})
			)

			// persist
			const res = await this.releasesService.create(data, songsData)

			// STORING NEW FILE
			if (cover) {
				// move
				const newImagePath = await cover.move(storageService, filePath.store.release)

				// persist path
				await this.releasesService.setCoverPath(newImagePath, id as number)
			}

			return new Reply<boolean>(res)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
