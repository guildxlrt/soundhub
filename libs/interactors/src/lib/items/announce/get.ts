import { DatabaseServices } from "Infra-backend"
import { GetAnnounceDTO } from "Dto"
import { BaseUsecase } from "../../../assets"

export class GetAnnounceUsecase extends BaseUsecase<GetAnnounceDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(id: GetAnnounceDTO): Promise<GetAnnounceDTO> {
		return await this.service.announce.get(id)
	}
}
