import { UsecaseLayer, ServicesType } from "../../../assets"
import { FindAnnouncesByArtistReplyDTO, ErrorMsg } from "Shared"
import { EntityId } from "Shared"

export class FindAnnouncesByArtistUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(id: EntityId): Promise<FindAnnouncesByArtistReplyDTO> {
		try {
			return await this.services.announces.findManyByArtist(id)
		} catch (error) {
			return new FindAnnouncesByArtistReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
