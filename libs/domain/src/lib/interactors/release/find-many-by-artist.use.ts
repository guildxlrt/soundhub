import { UsecaseLayer, ServicesType } from "../../../assets"
import { FindReleasesByArtistReplyDTO, ErrorMsg } from "Shared"
import { EntityId } from "Shared"

export class FindReleasesByArtistUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(id: EntityId): Promise<FindReleasesByArtistReplyDTO> {
		try {
			return await this.services.releases.findManyByArtist(id)
		} catch (error) {
			return new FindReleasesByArtistReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
