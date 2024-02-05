import { ErrorHandler, GetSongDTO } from "Shared"
import { UsecaseReply } from "../../utils"
import { SongsService } from "../../services"
import { IDUsecaseParams } from "../params-adapters"

export class FindSongsByArtistUsecase {
	mainService: SongsService
	constructor(mainService: SongsService) {
		this.mainService = mainService
	}

	async execute(input: IDUsecaseParams): Promise<UsecaseReply<GetSongDTO[]>> {
		try {
			const id = input.id
			const data = await this.mainService.findManyByArtist(id)
			return new UsecaseReply<GetSongDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
