import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../assets"
import { GetAllAnnouncesInputDTO, GetAllAnnouncesReplyDTO } from "Dto"

export class GetAllAnnouncesUsecase extends BaseUsecase<GetAllAnnouncesInputDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(): Promise<GetAllAnnouncesReplyDTO> {
		return await this.service.announce.getAll()
	}
}
