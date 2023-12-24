import { DatabaseServices } from "Infra-backend"
import { CreateEventInputDTO, CreateEventReplyDTO } from "Dto"
import { BaseUsecase } from "../../../assets"

export class CreateEventUsecase extends BaseUsecase<CreateEventInputDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(input: CreateEventInputDTO): Promise<CreateEventReplyDTO> {
		return await this.service.event.create(input)
	}
}
