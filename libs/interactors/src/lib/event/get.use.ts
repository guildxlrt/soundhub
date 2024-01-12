import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { GetEventReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer } from "../../assets"
import { EntityId } from "Shared"

export class GetEventUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(id: EntityId): Promise<GetEventReplyDTO> {
		try {
			return await this.services.events.get(id)
		} catch (error) {
			return new GetEventReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
