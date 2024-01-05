import { DatabaseServices } from "Infra-backend"
import { DeleteAnnounceInputDTO, DeleteAnnounceReplyDTO } from "Dto"
import { UsecaseLayer } from "../../assets"
import { IdParams } from "Domain"
import { ErrorMsg } from "Shared-utils"

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
