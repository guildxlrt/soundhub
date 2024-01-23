import { UsecaseLayer, ServicesType, GenreUsecaseParams } from "../../../assets"
import { FindArtistsByGenreReplyDTO, ErrorMsg } from "Shared"

export class FindArtistsByGenreUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: GenreUsecaseParams): Promise<FindArtistsByGenreReplyDTO> {
		try {
			const genre = inputs.genre

			return await this.services.artists.findManyByGenre(genre)
		} catch (error) {
			return new FindArtistsByGenreReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
