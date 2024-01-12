import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { UsecaseLayer } from "../../assets"
import { GetReleaseReplyDTO, ErrorMsg } from "Shared"
import { EntityId } from "Shared"

export class GetReleaseUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(id: EntityId): Promise<GetReleaseReplyDTO> {
		try {
			return await this.services.releases.get(id)
		} catch (error) {
			return new GetReleaseReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
