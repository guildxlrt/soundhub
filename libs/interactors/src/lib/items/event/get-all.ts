import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../../assets"
import { GetAllEventsDTO } from "Dto"

export class GetAllEventsUsecase extends BaseUsecase<GetAllEventsDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: GetAllEventsDTO): Promise<GetAllEventsDTO> {
		return await this.service.event.getAll(inputs)
	}
}
