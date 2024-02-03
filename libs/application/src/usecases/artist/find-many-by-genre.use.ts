import { GenreUsecaseParams, UsecaseReply } from "../../utils"
import { ArtistShortestDTO, ErrorHandler } from "Shared"
import { ArtistsService } from "../../services"

export class FindArtistsByGenreUsecase {
	mainService: ArtistsService
	constructor(mainService: ArtistsService) {
		this.mainService = mainService
	}

	async execute(input: GenreUsecaseParams): Promise<UsecaseReply<ArtistShortestDTO[]>> {
		try {
			const genre = input.genre

			const data = await this.mainService.findManyByGenre(genre)
			return new UsecaseReply<ArtistShortestDTO[]>(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
