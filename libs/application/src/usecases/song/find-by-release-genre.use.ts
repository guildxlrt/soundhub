import { ErrorHandler, SongDTO } from "Shared"
import { GenreUsecaseParams, UsecaseReply } from "../../utils"
import { SongsService } from "../../services"

export class FindSongsByReleaseGenreUsecase {
	mainService: SongsService
	constructor(mainService: SongsService) {
		this.mainService = mainService
	}

	async execute(input: GenreUsecaseParams): Promise<UsecaseReply<SongDTO[]>> {
		try {
			const genre = input.genre
			const data = await this.mainService.findByReleaseGenre(genre)

			return new UsecaseReply<SongDTO[]>(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
