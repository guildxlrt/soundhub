import { UsecaseLayer, ServicesType } from "../../../assets"
import { GetArtistByIdReplyDTO, ErrorMsg } from "Shared"
import { EntityId } from "Shared"

export class GetArtistByIdUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(id: EntityId): Promise<GetArtistByIdReplyDTO> {
		try {
			return await this.services.artists.getById(id)
		} catch (error) {
			return new GetArtistByIdReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
