import { DatabaseServices } from "Infra-backend"
import { CreateEventReplyDTO } from "Dto"
import { BaseUsecase } from "../../assets"
import { NewEventParams } from "Domain"

export class CreateEventUsecase extends BaseUsecase {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: NewEventParams): Promise<CreateEventReplyDTO> {
		return await this.services.events.create(inputs)
	}
}
