import { ErrorHandler, ErrorMsg, envs, htmlError } from "Shared"
import { ReleasesService, SongsService, StorageService } from "../../services"
import { UsecaseReply } from "../../utils"
import { DeleteSongUsecaseParams } from "../../adapters"

export class DeleteSongUsecase {
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

	async execute(input: DeleteSongUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			if (envs.backend && this.storageService && this.releasesService)
				return await this.backend(input, this.storageService, this.releasesService)
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
		releasesService: ReleasesService
	): Promise<UsecaseReply<boolean>> {
		try {
			const { id, ownerID } = input

			// publisher verification
			const releaseID = await this.mainService.getReleaseID(id as number)
			const releaseOwner = await releasesService.getOwner(releaseID as number)
			if (ownerID !== releaseOwner) throw ErrorMsg.htmlError(htmlError[403])

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
