import { DatabaseServices } from "Infra-backend"
import { DeleteAnnounceInputDTO, DeleteAnnounceReplyDTO } from "Dto"
import { BaseUsecase } from "../../../assets"

export class DeleteAnnounceUsecase extends BaseUsecase<DeleteAnnounceInputDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(input: DeleteAnnounceInputDTO): Promise<DeleteAnnounceReplyDTO> {
		return await this.service.announce.delete(input)
	}
}
