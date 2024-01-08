import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { UsecaseLayer } from "../../assets"
import { FindArtistsByGenreReqDTO, FindArtistsByGenreReplyDTO, ErrorMsg } from "Shared"
import { GenreParams } from "Shared"

export class FindArtistsByGenreUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(inputs: FindArtistsByGenreReqDTO): Promise<FindArtistsByGenreReplyDTO> {
		try {
			return await this.services.artists.findManyByGenre(new GenreParams(inputs))
		} catch (error) {
			return new FindArtistsByGenreReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
