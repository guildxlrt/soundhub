import { DatabaseServices } from "Infra-backend"
import { UsecaseLayer } from "../../assets"
import { FindReleasesByGenreReplyDTO } from "Dto"
import { GenreParams } from "Domain"

export class FindReleasesByGenreUsecase extends UsecaseLayer {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: GenreParams): Promise<FindReleasesByGenreReplyDTO> {
		return await this.services.releases.findManyByGenre(inputs)
	}
}
