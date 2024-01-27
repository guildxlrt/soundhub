import { UsecaseLayer, RepositoriesType, GenreUsecaseParams } from "../../assets"
import { FindArtistsByGenreReplyDTO, ErrorMsg } from "Shared"

export class FindArtistsByGenreUsecase {
	constructor(services: RepositoriesType) {
		super(services)
	}

	async execute(input: GenreUsecaseParams): Promise<FindArtistsByGenreReplyDTO> {
		try {
			const genre = input.genre

			return await this.services.artists.findManyByGenre(genre)
		} catch (error) {
			return new FindArtistsByGenreReplyDTO(
				undefined,
				new ErrorMsg(`Error: failed to persist`)
			)
		}
	}
}
