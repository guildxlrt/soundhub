import { DatabaseServices } from "Infra-backend"
import { UsecaseLayer } from "../../assets"
import { FindReleasesByArtistReplyDTO } from "Dto"
import { IdParams } from "Domain"

export class FindReleasesByArtistUsecase extends UsecaseLayer {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: IdParams): Promise<FindReleasesByArtistReplyDTO> {
		return await this.services.releases.findManyByArtist(inputs)
	}
}
