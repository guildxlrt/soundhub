import { EditEventReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer, ServicesType, EventUsecaseParams } from "../../../assets"
import { Event } from "../../entities"

export class EditEventUsecase extends UsecaseLayer {
	constructor(services: ServicesType, backend: boolean) {
		super(services, backend)
	}

	async execute(inputs: EventUsecaseParams): Promise<EditEventReplyDTO> {
		try {
			const { owner_id, date, place, artists, title, text, id } = inputs.data

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

			return await this.services.events.edit(event, inputs.file)
		} catch (error) {
			return new EditEventReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
