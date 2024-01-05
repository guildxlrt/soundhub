import { DatabaseServices } from "Infra-backend"
import { UsecaseLayer } from "../../assets"
import { FindArtistsByGenreInputDTO, FindArtistsByGenreReplyDTO } from "Dto"
import { GenreParams } from "Domain"

export class FindArtistsByGenreUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: FindArtistsByGenreInputDTO): Promise<FindArtistsByGenreReplyDTO> {
		return await this.services.artists.findManyByGenre(new GenreParams(inputs))
	}
}
