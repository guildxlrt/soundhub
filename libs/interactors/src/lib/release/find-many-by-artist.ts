import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../assets"
import { FindReleasesByArtistInputDTO, FindReleasesByArtistReplyDTO } from "Dto"

export class FindReleasesByArtistUsecase extends BaseUsecase<FindReleasesByArtistInputDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(input: FindReleasesByArtistInputDTO): Promise<FindReleasesByArtistReplyDTO> {
		return await this.service.release.findManyByArtist(input)
	}
}
