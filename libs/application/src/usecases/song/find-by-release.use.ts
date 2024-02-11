import { ErrorHandler, GetSongDTO } from "Shared"
import { UsecaseReply } from "../../utils"
import { SongsService } from "../../services"
import { IDUsecaseParams } from "../../adapters"

export class FindSongsByReleaseUsecase {
	mainService: SongsService
	constructor(mainService: SongsService) {
		this.mainService = mainService
	}

	async execute(input: IDUsecaseParams): Promise<UsecaseReply<GetSongDTO[]>> {
		try {
			const id = input.id
			const data = await this.mainService.findManyByRelease(id)
			return new UsecaseReply<GetSongDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
