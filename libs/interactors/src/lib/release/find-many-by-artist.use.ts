import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../assets"
import { FindReleasesByArtistReplyDTO } from "Dto"
import { IdParams } from "Domain"

export class FindReleasesByArtistUsecase extends BaseUsecase {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: IdParams): Promise<FindReleasesByArtistReplyDTO> {
		return await this.services.releases.findManyByArtist(inputs)
	}
}
