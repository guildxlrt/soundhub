import { GenreUsecaseParams } from "../../assets"
import { FindArtistsByGenreReplyDTO, ErrorHandler } from "Shared"
import { ArtistsService } from "../../services"

export class FindArtistsByGenreUsecase {
	artistsService: ArtistsService
	constructor(artistsService: ArtistsService) {
		this.artistsService = artistsService
	}

	async execute(input: GenreUsecaseParams): Promise<FindArtistsByGenreReplyDTO> {
		try {
			const genre = input.genre

			const data = await this.artistsService.findManyByGenre(genre)
			return new FindArtistsByGenreReplyDTO(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
