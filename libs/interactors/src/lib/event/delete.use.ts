import { DatabaseServices } from "Infra-backend"
import { DeleteEventInputDTO, DeleteEventReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer } from "../../assets"
import { IdParams } from "Shared"

export class DeleteEventUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: DeleteEventInputDTO): Promise<DeleteEventReplyDTO> {
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
