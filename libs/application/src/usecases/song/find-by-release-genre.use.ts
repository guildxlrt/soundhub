import { ErrorHandler, GetSongDTO } from "Shared"
import { UsecaseReply } from "../../utils"
import { SongsService } from "../../services"
import { GenreUsecaseParams } from "../../adapters"

export class FindSongsByReleaseGenreUsecase {
	mainService: SongsService
	constructor(mainService: SongsService) {
		this.mainService = mainService
	}

	async execute(input: GenreUsecaseParams): Promise<UsecaseReply<GetSongDTO[]>> {
		try {
			const genre = input.genre
			const data = await this.mainService.findManyByReleaseGenre(genre)

			return new UsecaseReply<GetSongDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
