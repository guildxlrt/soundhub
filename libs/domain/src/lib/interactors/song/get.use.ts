import { GetSongReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer, ServicesType } from "../../../assets"
import { EntityId } from "Shared"

export class GetSongUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(id: EntityId): Promise<GetSongReplyDTO> {
		try {
			return await this.services.songs.get(id)
		} catch (error) {
			return new GetSongReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
