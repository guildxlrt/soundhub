import { ErrorHandler, SongDTO } from "Shared"
import { UsecaseReply } from "../../utils"
import { SongsService } from "../../services"
import { IDUsecaseParams } from "../params-adapters"

export class GetSongUsecase {
	mainService: SongsService
	constructor(mainService: SongsService) {
		this.mainService = mainService
	}

	async execute(input: IDUsecaseParams): Promise<UsecaseReply<SongDTO>> {
		try {
			const id = input.id
			const data = await this.mainService.get(id)
			return new UsecaseReply<SongDTO>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
