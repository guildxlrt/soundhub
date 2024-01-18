import { UsecaseLayer, ServicesType } from "../../../assets"
import { FindEventsByArtistReplyDTO, ErrorMsg } from "Shared"
import { EntityId } from "Shared"

export class FindEventsByArtistUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(id: EntityId): Promise<FindEventsByArtistReplyDTO> {
		try {
			return await this.services.events.findManyByArtist(id)
		} catch (error) {
			return new FindEventsByArtistReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
