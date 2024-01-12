import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { UsecaseLayer } from "../../assets"
import { FindArtistsByGenreReplyDTO, ErrorMsg } from "Shared"
import { GenreType } from "Shared"

export class FindArtistsByGenreUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(genre: GenreType): Promise<FindArtistsByGenreReplyDTO> {
		try {
			return await this.services.artists.findManyByGenre(genre)
		} catch (error) {
			return new FindArtistsByGenreReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
