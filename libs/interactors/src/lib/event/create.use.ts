import { DatabaseServices } from "Infra-backend"
import { CreateEventInputDTO, CreateEventReplyDTO } from "Dto"
import { UsecaseLayer } from "../../assets"
import { Event, NewEventParams } from "Domain"
import { ErrorMsg } from "Shared-utils"

export class CreateEventUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: CreateEventInputDTO): Promise<CreateEventReplyDTO> {
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
