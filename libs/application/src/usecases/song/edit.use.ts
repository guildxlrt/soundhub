import { ErrorHandler, ErrorMsg, envs, htmlError } from "Shared"
import { ReleasesService, SongsService, StorageService } from "../../services"
import { UsecaseReply } from "../../utils"
import { EditSongUsecaseParams } from "../../adapters"

export class EditSongUsecase {
	private mainService: SongsService
	private storageService?: StorageService
	private releasesService?: ReleasesService

	constructor(
		mainService: SongsService,
		storageService?: StorageService,
		releasesService?: ReleasesService
	) {
		this.mainService = mainService
		this.storageService = storageService
		this.releasesService = releasesService
	}

	async execute(input: EditSongUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { audio, data } = input
			audio?.validateAudio()
			data.sanitize()

			if (envs.backend && this.storageService && this.releasesService)
				return await this.backend(input, this.storageService, this.releasesService)
			else if (envs.backend && !this.storageService) throw new ErrorMsg("services error")
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: EditSongUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { data, audio } = input

			const res = await this.mainService.edit({ data, audio })
			return new UsecaseReply<boolean>(res, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		input: EditSongUsecaseParams,
		storageService: StorageService,
		releasesService: ReleasesService
	): Promise<UsecaseReply<boolean>> {
		try {
			const { audio, data, ownerID } = input
			const { id, release_id } = data
			// publisher verification
			const releaseOwner = await releasesService.getOwner(release_id as number)
			if (ownerID !== releaseOwner) throw ErrorMsg.htmlError(htmlError[403])

			// editability verification
			const isReadOnly = await this.mainService.getEditability(id as number)
			if (isReadOnly === true) throw ErrorMsg.htmlError(htmlError[403])

			// STORING AUDIOFILE
			if (audio) {
				// release folder
				const releaseFolder = await releasesService.getFolderPath(data.release_id as number)
				if (!releaseFolder) throw new ErrorMsg(`Error: failed to store`)
				// move and update entity
				const audioPath = await storageService.move(audio, releaseFolder)
				data.setAudioPath(audioPath)
			}

			// persist
			const res = await this.mainService.edit(data)

			return new UsecaseReply<boolean>(res, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
