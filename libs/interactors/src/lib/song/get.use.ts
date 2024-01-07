import { DatabaseServices } from "Infra-backend"
import { GetSongInputDTO, GetSongReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer } from "../../assets"
import { IdParams } from "Shared"

export class GetSongUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: GetSongInputDTO): Promise<GetSongReplyDTO> {
		try {
			return await this.services.songs.get(new IdParams(inputs.id))
		} catch (error) {
			return new GetSongReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
