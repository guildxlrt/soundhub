import { CreateEventReplyDTO, ErrorMsg, NewEventAdapter } from "Shared"
import { UsecaseLayer, ServicesType } from "../../../assets"
import { Event } from "../../entities"

export class CreateEventUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: NewEventAdapter): Promise<CreateEventReplyDTO> {
		try {
			const { owner_id, date, place, artists, title, text } = inputs.data

			const event = new Event(
				null,
				owner_id as number,
				date,
				place,
				artists,
				title,
				text,
				null
			)
			return await this.services.events.create(event, inputs.file)
		} catch (error) {
			return new CreateEventReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
