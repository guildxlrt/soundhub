import { DatabaseServices } from "Infra-backend"
import { GetSongInputDTO, GetSongReplyDTO } from "Dto"
import { UsecaseLayer } from "../../assets"
import { IdParams } from "Domain"
import { ErrorMsg } from "Shared-utils"

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
