import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { DeleteEventReqDTO, DeleteEventReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer } from "../../assets"
import { IdParams } from "Shared"

export class DeleteEventUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(inputs: DeleteEventReqDTO): Promise<DeleteEventReplyDTO> {
		try {
			return await this.services.events.delete(new IdParams(inputs.id))
		} catch (error) {
			return new DeleteEventReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
