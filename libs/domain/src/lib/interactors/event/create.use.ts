import { CreateEventReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer, ServicesType, EventUsecaseParams } from "../../../assets"
import { Event } from "../../entities"

export class CreateEventUsecase extends UsecaseLayer {
	constructor(services: ServicesType, backend: boolean) {		super(services, backend)
	}

	async execute(inputs: EventUsecaseParams): Promise<CreateEventReplyDTO> {
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
				new ErrorMsg(`Error: failed to persist`)
			)
		}
	}
}
