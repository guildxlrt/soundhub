import { ErrorHandler, ErrorMsg, envs, filePath, htmlError } from "Shared"
import { NewReleaseUsecaseParams, UsecaseReply } from "../../utils"
import { ReleasesService, StorageService } from "../../services"
import { Song } from "Domain"

export class CreateReleaseUsecase {
	private mainService: ReleasesService
	private storageService?: StorageService

	constructor(mainService: ReleasesService, storageService?: StorageService) {
		this.mainService = mainService
		this.storageService = storageService
	}

	async execute(input: NewReleaseUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { cover, data } = input.release
			cover?.validateImage()
			data.sanitize(true)
			data.validateReleaseType()

			input.songs.forEach((song) => {
				song.data.sanitize(true)
				song.audio.validateAudio()
			})

			if (envs.backend && this.storageService)
				return await this.backend(input, this.storageService)
			else if (envs.backend && !this.storageService) throw new ErrorMsg("services error")
			else return await this.frontend(input)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async frontend(input: NewReleaseUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { songs, release } = input
			const { cover, data } = release

			const res = await this.mainService.create({ data: data, cover }, songs)
			return new UsecaseReply(res)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async backend(
		input: NewReleaseUsecaseParams,
		storageService: StorageService
	): Promise<UsecaseReply<boolean>> {
		try {
			const { songs, release } = input
			const { cover, data } = release
			const { owner_id, id } = data

			// owner verification
			const releaseOwner = await this.mainService.getOwner(id as number)
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
			const res = await this.mainService.create(data, songsData)

			// STORING NEW FILE
			if (cover) {
				// move
				const newImagePath = await cover.move(storageService, filePath.store.release)

				// persist path
				await this.mainService.setCoverPath(newImagePath, id as number)
			}

			return new UsecaseReply<boolean>(res)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
