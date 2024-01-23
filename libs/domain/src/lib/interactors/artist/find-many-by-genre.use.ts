import { UsecaseLayer, ServicesType, GenreUsecaseParams } from "../../../assets"
import { FindArtistsByGenreReplyDTO, ErrorMsg } from "Shared"

export class FindArtistsByGenreUsecase extends UsecaseLayer {
	constructor(services: ServicesType, backend: boolean) {
		super(services, backend)
	}

	async execute(inputs: GenreUsecaseParams): Promise<FindArtistsByGenreReplyDTO> {
		try {
			const genre = inputs.genre

			return await this.services.artists.findManyByGenre(genre)
		} catch (error) {
			return new FindArtistsByGenreReplyDTO(
				undefined,
				new ErrorMsg(`Error: failed to persist`)
			)
		}
	}
}
