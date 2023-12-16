import { DatabaseServices } from "Infra-backend"
import { CreateEventDTO } from "Dto"
import { BaseUsecase } from "../../../assets"

export class CreateEventUsecase extends BaseUsecase<CreateEventDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(params: CreateEventDTO): Promise<CreateEventDTO> {
		return await this.service.event.create(params)
	}
}
