import { GenreUsecaseParams, Reply } from "../../assets"
import { ArtistShortestDTO, ErrorHandler } from "Shared"
import { ArtistsService } from "../../services"

export class FindArtistsByGenreUsecase {
	artistsService: ArtistsService
	constructor(artistsService: ArtistsService) {
		this.artistsService = artistsService
	}

	async execute(input: GenreUsecaseParams): Promise<Reply<ArtistShortestDTO[]>> {
		try {
			const genre = input.genre

			const data = await this.artistsService.findManyByGenre(genre)
			return new Reply<ArtistShortestDTO[]>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
