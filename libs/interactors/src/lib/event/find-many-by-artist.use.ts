import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../assets"
import { FindEventsByArtistReplyDTO } from "Dto"
import { IdParams } from "Domain"

export class FindEventsByArtistUsecase extends BaseUsecase {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: IdParams): Promise<FindEventsByArtistReplyDTO> {
		return await this.services.events.findManyByArtist(inputs)
	}
}
