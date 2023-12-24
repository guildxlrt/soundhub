import { DatabaseServices } from "Infra-backend"
import { CreateAnnounceInputDTO, CreateAnnounceReplyDTO } from "Dto"
import { BaseUsecase } from "../../../assets"

export class CreateAnnounceUsecase extends BaseUsecase<CreateAnnounceInputDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(input: CreateAnnounceInputDTO): Promise<CreateAnnounceReplyDTO> {
		return await this.service.announce.create(input)
	}
}
