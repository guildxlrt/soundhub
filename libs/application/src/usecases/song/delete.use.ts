import { ErrorHandler, ErrorMsg, envs, htmlError } from "Shared"
import { RecordsService, SongsService, StorageService } from "../../services"
import { UsecaseReply } from "../../utils"
import { DeleteSongUsecaseParams } from "../../adapters"

export class DeleteSongUsecase {
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

	async execute(input: DeleteSongUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			if (envs.backend && this.storageService && this.recordsService)
				return await this.backend(input, this.storageService, this.recordsService)
			else if (envs.backend && !this.storageService) throw new ErrorMsg("services error")
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: DeleteSongUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { id } = input

			const res = await this.mainService.delete(id)
			return new UsecaseReply<boolean>(res, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		input: DeleteSongUsecaseParams,
		storageService: StorageService,
		recordsService: RecordsService
	): Promise<UsecaseReply<boolean>> {
		try {
			const { id, ownerID } = input

			// publisher verification
			const recordID = await this.mainService.getRecordID(id as number)
			const recordOwner = await recordsService.getOwner(recordID as number)
			if (ownerID !== recordOwner) throw ErrorMsg.htmlError(htmlError[403])

			// editability verification
			const isReadOnly = await this.mainService.getEditability(id as number)
			if (isReadOnly === true) throw ErrorMsg.htmlError(htmlError[403])

			// DELETE AUDIOFILE
			const audioPath = await this.mainService.getAudioPath(id as number)
			await storageService.delete(audioPath as string)

			// persist
			const res = await this.mainService.delete(id)

			return new UsecaseReply<boolean>(res, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
