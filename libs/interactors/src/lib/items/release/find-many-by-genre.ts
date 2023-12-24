import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../../assets"
import { FindReleasesByGenreInputDTO, FindReleasesByGenreReplyDTO } from "Dto"

export class FindReleasesByGenreUsecase extends BaseUsecase<FindReleasesByGenreInputDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(input: FindReleasesByGenreInputDTO): Promise<FindReleasesByGenreReplyDTO> {
		return await this.service.release.findManyByGenre(input)
	}
}
