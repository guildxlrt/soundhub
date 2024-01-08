import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { UsecaseLayer } from "../../assets"
import { FindEventsByArtistReqDTO, FindEventsByArtistReplyDTO, ErrorMsg } from "Shared"
import { IdParams } from "Shared"

export class FindEventsByArtistUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(inputs: FindEventsByArtistReqDTO): Promise<FindEventsByArtistReplyDTO> {
		try {
			return await this.services.events.findManyByArtist(new IdParams(inputs.id))
		} catch (error) {
			return new FindEventsByArtistReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
