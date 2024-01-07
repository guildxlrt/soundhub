import { DatabaseServices } from "Infra-backend"
import { UsecaseLayer } from "../../assets"
import { FindArtistsByGenreInputDTO, FindArtistsByGenreReplyDTO, ErrorMsg } from "Shared"
import { GenreParams } from "Shared"


export class FindArtistsByGenreUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: FindArtistsByGenreInputDTO): Promise<FindArtistsByGenreReplyDTO> {
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
