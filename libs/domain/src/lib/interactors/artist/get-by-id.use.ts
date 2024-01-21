import { UsecaseLayer, ServicesType } from "../../../assets"
import { GetArtistByIDReplyDTO, ErrorMsg } from "Shared"
import { EntityID } from "Shared"

export class GetArtistByIDUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(id: EntityID): Promise<GetArtistByIDReplyDTO> {
		try {
			return await this.services.artists.getByID(id)
		} catch (error) {
			return new GetArtistByIDReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
