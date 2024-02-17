import { ErrorHandler, GenreType, GetSongDTO } from "Shared"
import { UsecaseReply } from "../../utils"
import { SongsService } from "../../services"

export class SearchSongsUsecase {
	mainService: SongsService
	constructor(mainService: SongsService) {
		this.mainService = mainService
	}

	async execute(
		recordID: number,
		artistID: number,
		genre: GenreType
	): Promise<UsecaseReply<GetSongDTO[]>> {
		try {
			const data = await this.mainService.search(recordID, artistID, genre)
			return new UsecaseReply<GetSongDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
