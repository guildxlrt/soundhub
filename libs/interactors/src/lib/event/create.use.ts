import { DatabaseServices } from "Infra-backend"
import { CreateEventReplyDTO } from "Dto"
import { UsecaseLayer } from "../../assets"
import { NewEventParams } from "Domain"

export class CreateEventUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: NewEventParams): Promise<CreateEventReplyDTO> {
		return await this.services.events.create(inputs)
	}
}
