import { ErrorHandler, ErrorMsg, envs, htmlError } from "Shared"
import { RecordsService, SongsService, StorageService } from "../../services"
import { UsecaseReply } from "../../utils"
import { EditSongUsecaseParams } from "../../adapters"

export class EditSongUsecase {
	private mainService: SongsService
	private storageService?: StorageService
	private recordsService?: RecordsService

	constructor(
		mainService: SongsService,
		storageService?: StorageService,
		recordsService?: RecordsService
	) {
		this.mainService = mainService
		this.storageService = storageService
		this.recordsService = recordsService
	}

	async execute(input: EditSongUsecaseParams): Promise<UsecaseReply<boolean>> {
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
		recordsService: RecordsService
	): Promise<UsecaseReply<boolean>> {
		try {
			const { audio, data, ownerID } = input
			const { id, record_id } = data
			// publisher verification
			const recordOwner = await recordsService.getOwner(record_id as number)
			if (ownerID !== recordOwner) throw ErrorMsg.htmlError(htmlError[403])

			// editability verification
			const isReadOnly = await this.mainService.getEditability(id as number)
			if (isReadOnly === true) throw ErrorMsg.htmlError(htmlError[403])

			// STORING AUDIOFILE
			if (audio) {
				// record folder
				const recordFolder = await recordsService.getFolderPath(data.record_id as number)
				if (!recordFolder) throw new ErrorMsg(`Error: failed to store`)
				// move and update entity
				const audioPath = await storageService.move(audio, recordFolder)
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
