import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../../assets"
import { FindArtistsByGenreDTO } from "Dto"

export class FindArtistsByGenreUsecase extends BaseUsecase<FindArtistsByGenreDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: FindArtistsByGenreDTO): Promise<FindArtistsByGenreDTO> {
		return await this.service.artist.findManyByGenre(inputs)
	}
}
