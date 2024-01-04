import { DatabaseServices } from "Infra-backend"
import { UsecaseLayer } from "../../assets"
import { FindAnnouncesByArtistReplyDTO } from "Dto"
import { IdParams } from "Domain"

export class FindAnnouncesByArtistUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: IdParams): Promise<FindAnnouncesByArtistReplyDTO> {
		return await this.services.announces.findManyByArtist(inputs)
	}
}
