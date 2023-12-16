import { DatabaseServices } from "Infra-backend"
import { GetEventDTO } from "Dto"
import { BaseUsecase } from "../../../assets"

export class GetEventUsecase extends BaseUsecase<GetEventDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(id: GetEventDTO): Promise<GetEventDTO> {
		return await this.service.event.get(id)
	}
}
