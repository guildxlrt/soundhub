import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../assets"
import { FindReleasesByGenreReplyDTO } from "Dto"
import { GenreParams } from "Domain"

export class FindReleasesByGenreUsecase extends BaseUsecase {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: GenreParams): Promise<FindReleasesByGenreReplyDTO> {
		return await this.services.releases.findManyByGenre(inputs)
	}
}
