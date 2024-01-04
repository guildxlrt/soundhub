import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../assets"
import { FindArtistsByGenreReplyDTO } from "Dto"
import { FetchByGenreParams } from "Domain"

export class FindArtistsByGenreUsecase extends BaseUsecase {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(input: FetchByGenreParams): Promise<FindArtistsByGenreReplyDTO> {
		return await this.service.artist.findManyByGenre(input)
	}
}
