import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { CreateEventReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer } from "../../assets"
import { NewEventParams } from "Shared"

export class CreateEventUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(inputs: NewEventParams): Promise<CreateEventReplyDTO> {
		try {
			return await this.services.events.create(inputs)
		} catch (error) {
			return new CreateEventReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
