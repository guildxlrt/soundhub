import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../../assets"
import { FindReleasesByGenreDTO } from "Dto"

export class FindReleasesByGenreUsecase extends BaseUsecase<FindReleasesByGenreDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: FindReleasesByGenreDTO): Promise<FindReleasesByGenreDTO> {
		return await this.service.release.findManyByGenre(inputs)
	}
}
