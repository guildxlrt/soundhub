import { DatabaseServices } from "Infra-backend"
import { GetAnnounceInputDTO, GetAnnounceReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer } from "../../assets"
import { IdParams } from "Shared"

export class GetAnnounceUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: GetAnnounceInputDTO): Promise<GetAnnounceReplyDTO> {
		try {
			return await this.services.announces.get(new IdParams(inputs.id))
		} catch (error) {
			return new GetAnnounceReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
