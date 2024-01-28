import { GenreUsecaseParams } from "../../assets"
import { FindArtistsByGenreReplyDTO, ErrorMsg } from "Shared"
import { ArtistsService } from "../../services"

export class FindArtistsByGenreUsecase {
	artistsService: ArtistsService
	constructor(artistsService: ArtistsService) {
		this.artistsService = artistsService
	}

	async execute(input: GenreUsecaseParams): Promise<FindArtistsByGenreReplyDTO> {
		try {
			const genre = input.genre

			return await this.artistsService.findManyByGenre(genre)
		} catch (error) {
			return new FindArtistsByGenreReplyDTO(
				undefined,
				new ErrorMsg(`Error: failed to persist`)
			)
		}
	}
}
