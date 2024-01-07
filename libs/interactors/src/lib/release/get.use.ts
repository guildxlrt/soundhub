import { DatabaseServices } from "Infra-backend"
import { UsecaseLayer } from "../../assets"
import { GetReleaseInputDTO, GetReleaseReplyDTO, ErrorMsg } from "Shared"
import { IdParams } from "Shared"

export class GetReleaseUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: GetReleaseInputDTO): Promise<GetReleaseReplyDTO> {
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
