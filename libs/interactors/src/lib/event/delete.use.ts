import { DatabaseServices } from "Infra-backend"
import { DeleteEventInputDTO, DeleteEventReplyDTO } from "Dto"
import { UsecaseLayer } from "../../assets"
import { IdParams } from "Domain"
import { ErrorMsg } from "Shared-utils"

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
