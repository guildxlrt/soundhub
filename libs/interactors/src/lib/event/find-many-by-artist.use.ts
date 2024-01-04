import { DatabaseServices } from "Infra-backend"
import { UsecaseLayer } from "../../assets"
import { FindEventsByArtistReplyDTO } from "Dto"
import { IdParams } from "Domain"

export class FindEventsByArtistUsecase extends UsecaseLayer {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: IdParams): Promise<FindEventsByArtistReplyDTO> {
		return await this.services.events.findManyByArtist(inputs)
	}
}
