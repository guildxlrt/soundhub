import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { GetAnnounceReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer } from "../../assets"
import { EntityId } from "Shared"

export class GetAnnounceUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(id: EntityId): Promise<GetAnnounceReplyDTO> {
		try {
			return await this.services.announces.get(id)
		} catch (error) {
			return new GetAnnounceReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
