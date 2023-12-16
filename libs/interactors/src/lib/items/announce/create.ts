import { DatabaseServices } from "Infra-backend"
import { CreateAnnounceDTO } from "Dto"
import { BaseUsecase } from "../../../assets"

export class CreateAnnounceUsecase extends BaseUsecase<CreateAnnounceDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(params: CreateAnnounceDTO): Promise<CreateAnnounceDTO> {
		return await this.service.announce.create(params)
	}
}
