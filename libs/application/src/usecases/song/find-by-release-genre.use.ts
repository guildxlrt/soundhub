import { ErrorHandler, SongDTO } from "Shared"
import { UsecaseReply } from "../../utils"
import { SongsService } from "../../services"
import { GenreUsecaseParams } from "../params-adapters"

export class FindSongsByReleaseGenreUsecase {
	mainService: SongsService
	constructor(mainService: SongsService) {
		this.mainService = mainService
	}

	async execute(input: GenreUsecaseParams): Promise<UsecaseReply<SongDTO[]>> {
		try {
			const genre = input.genre
			const data = await this.mainService.findByReleaseGenre(genre)

			return new UsecaseReply<SongDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
