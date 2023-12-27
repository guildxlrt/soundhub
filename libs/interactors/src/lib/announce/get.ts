import { DatabaseServices } from "Infra-backend"
import { GetAnnounceInputDTO, GetAnnounceReplyDTO } from "Dto"
import { BaseUsecase } from "../../assets"

export class GetAnnounceUsecase extends BaseUsecase<GetAnnounceInputDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(id: GetAnnounceInputDTO): Promise<GetAnnounceReplyDTO> {
		return await this.service.announce.get(id)
	}
}
