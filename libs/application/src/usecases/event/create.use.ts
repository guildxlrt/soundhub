import { CreateEventReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer, RepositoriesType, EventUsecaseParams } from "../../assets"
import { Event } from "Domain"

export class CreateEventUsecase {
	constructor(services: RepositoriesType) {
		super(services)
	}

	async execute(input: EventUsecaseParams): Promise<CreateEventReplyDTO> {
		try {
			const { owner_id, date, place, artists, title, text } = input.data

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
			return await this.services.events.create(event, input.file)
		} catch (error) {
			return new CreateEventReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
