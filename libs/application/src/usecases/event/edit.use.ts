import { EditEventReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer, RepositoriesType, EventUsecaseParams } from "../../assets"
import { Event } from "Domain"

export class EditEventUsecase {
	constructor(services: RepositoriesType) {
		super(services)
	}

	async execute(input: EventUsecaseParams): Promise<EditEventReplyDTO> {
		try {
			const { owner_id, date, place, artists, title, text, id } = input.data

			const event = new Event(
				id as number,
				owner_id as number,
				date,
				place,
				artists,
				title,
				text,
				null
			)

			return await this.services.events.edit(event, input.file)
		} catch (error) {
			return new EditEventReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
