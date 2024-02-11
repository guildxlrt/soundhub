import { ErrorHandler, ErrorMsg, envs, htmlError } from "Shared"
import { ArtistsService, ReleasesService, SongsService, StorageService } from "../../services"
import { UsecaseReply } from "../../utils"
import { AddSongUsecaseParams } from "../../adapters"
import { StreamFile } from "Domain"

export class AddSongUsecase {
	private mainService: SongsService
	private storageService?: StorageService
	private artistService?: ArtistsService
	private releasesService?: ReleasesService

	constructor(mainService: SongsService, storageService?: StorageService) {
		this.mainService = mainService
		this.storageService = storageService
	}

	async execute(input: AddSongUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { audio, data } = input
			audio?.validateAudio()
			data.sanitize()

			if (envs.backend && this.storageService && this.artistService && this.releasesService)
				return await this.backend(
					input,
					this.storageService,
					this.artistService,
					this.releasesService
				)
			else if (envs.backend && !this.storageService) throw new ErrorMsg("services error")
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: AddSongUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { data, audio } = input

			const res = await this.mainService.add({ data, audio })
			return new UsecaseReply<boolean>(res, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		input: AddSongUsecaseParams,
		storageService: StorageService,
		artistService: ArtistsService,
		releasesService: ReleasesService
	): Promise<UsecaseReply<boolean>> {
		try {
			const { audio, data, ownerID } = input

			// owner verification
			const releaseOwner = await releasesService.getOwner(data.release_id as number)
			if (ownerID !== releaseOwner) throw ErrorMsg.htmlError(htmlError[403])

			// STORING AUDIOFILE
			// release folder
			const releaseFolder = await releasesService.getFolderPath(data.release_id as number)
			if (!releaseFolder) throw new ErrorMsg(`Error: failed to store`)
			// move and update entity
			const audioPath = await storageService.move(audio, releaseFolder)
			data.setAudioPath(audioPath)

			// validate
			await data.validateArtistArray(artistService)

			// persist
			const res = await this.mainService.add(data)

			return new UsecaseReply<boolean>(res, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
