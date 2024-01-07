import { DatabaseServices } from "Infra-backend"
import { DeleteAnnounceInputDTO, DeleteAnnounceReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer } from "../../assets"
import { IdParams } from "Shared"

export class DeleteAnnounceUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: DeleteAnnounceInputDTO): Promise<DeleteAnnounceReplyDTO> {
		try {
			return await this.services.announces.delete(new IdParams(inputs.id))
		} catch (error) {
			return new DeleteAnnounceReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
