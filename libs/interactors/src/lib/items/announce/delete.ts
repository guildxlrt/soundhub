import { DatabaseServices } from "Infra-backend"
import { DeleteAnnouncesInputDTO, DeleteAnnouncesReplyDTO } from "Dto"
import { BaseUsecase } from "../../../assets"

export class DeleteAnnounceUsecase extends BaseUsecase<DeleteAnnouncesInputDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(input: DeleteAnnouncesInputDTO): Promise<DeleteAnnouncesReplyDTO> {
		return await this.service.announce.delete(input)
	}
}
