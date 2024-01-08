import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { UsecaseLayer } from "../../assets"
import { GetReleaseReqDTO, GetReleaseReplyDTO, ErrorMsg } from "Shared"
import { IdParams } from "Shared"

export class GetReleaseUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(inputs: GetReleaseReqDTO): Promise<GetReleaseReplyDTO> {
		try {
			return await this.services.releases.get(new IdParams(inputs.id))
		} catch (error) {
			return new GetReleaseReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
