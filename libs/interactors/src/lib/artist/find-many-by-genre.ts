import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../assets"
import { FindArtistsByGenreInputDTO, FindArtistsByGenreReplyDTO } from "Dto"

export class FindArtistsByGenreUsecase extends BaseUsecase<FindArtistsByGenreInputDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(input: FindArtistsByGenreInputDTO): Promise<FindArtistsByGenreReplyDTO> {
		return await this.service.artist.findManyByGenre(input)
	}
}
