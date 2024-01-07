import { DatabaseServices } from "Infra-backend"
import { UsecaseLayer } from "../../assets"
import { FindEventsByArtistInputDTO, FindEventsByArtistReplyDTO, ErrorMsg } from "Shared"
import { IdParams } from "Shared"

export class FindEventsByArtistUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: FindEventsByArtistInputDTO): Promise<FindEventsByArtistReplyDTO> {
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
