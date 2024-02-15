import { ErrorHandler, ErrorMsg, envs, htmlError } from "Shared"
import { RecordsService, SongsService, StorageService } from "../../services"
import { UsecaseReply } from "../../utils"
import { AddSongUsecaseParams } from "../../adapters"

export class AddSongUsecase {
	private mainService: SongsService
	private storageService?: StorageService
	private recordsService?: RecordsService

	constructor(mainService: SongsService, storageService?: StorageService) {
		this.mainService = mainService
		this.storageService = storageService
	}

	async execute(input: AddSongUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { audio, data } = input
			audio?.validateAudio()
			data.sanitize()

			if (envs.backend && this.storageService && this.recordsService)
				return await this.backend(input, this.storageService, this.recordsService)
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
		recordsService: RecordsService
	): Promise<UsecaseReply<boolean>> {
		try {
			const { audio, data, artistsIDs, authID } = input
			const { id } = data

			// auth verification
			const checkRights = await this.mainService.checkRights(id as number, authID as number)
			if (!checkRights) throw ErrorMsg.htmlError(htmlError[403])

			// STORING AUDIOFILE
			// record folder
			const recordFolder = await recordsService.getFolderPath(data.record_id as number)
			if (!recordFolder) throw new ErrorMsg(`Error: failed to store`)
			// move and update entity
			const audioPath = await storageService.move(audio, recordFolder)
			data.setAudioPath(audioPath)

			// persist
			const res = await this.mainService.add({
				song: data,
				artists: artistsIDs,
			})

			return new UsecaseReply<boolean>(res, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
