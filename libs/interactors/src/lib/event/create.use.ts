import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { CreateEventReqDTO, CreateEventReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer } from "../../assets"
import { Event, NewEventParams } from "Shared"

export class CreateEventUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(inputs: CreateEventReqDTO): Promise<CreateEventReplyDTO> {
		try {
			const { date, planner, place, artists, title, text } = inputs
			const eventData = new Event(undefined, planner, date, place, artists, title, text, null)

			return await this.services.events.create(new NewEventParams(eventData))
		} catch (error) {
			return new CreateEventReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
