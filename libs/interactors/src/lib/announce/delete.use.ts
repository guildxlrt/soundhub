import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { DeleteAnnounceReqDTO, DeleteAnnounceReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer } from "../../assets"
import { IdParams } from "Shared"

export class DeleteAnnounceUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(inputs: DeleteAnnounceReqDTO): Promise<DeleteAnnounceReplyDTO> {
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
