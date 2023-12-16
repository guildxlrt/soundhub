import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../../assets"
import { GetAllAnnouncesDTO } from "Dto"

export class GetAllAnnouncesUsecase extends BaseUsecase<GetAllAnnouncesDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: GetAllAnnouncesDTO): Promise<GetAllAnnouncesDTO> {
		return await this.service.announce.getAll(inputs)
	}
}
