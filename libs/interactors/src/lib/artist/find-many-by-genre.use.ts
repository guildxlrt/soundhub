import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../assets"
import { FindArtistsByGenreReplyDTO } from "Dto"
import { GenreParams } from "Domain"

export class FindArtistsByGenreUsecase extends BaseUsecase {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: GenreParams): Promise<FindArtistsByGenreReplyDTO> {
		return await this.services.artists.findManyByGenre(inputs)
	}
}
