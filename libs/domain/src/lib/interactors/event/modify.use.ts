import { ModifyEventReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer, ServicesType } from "../../../assets"
import { ModifyEventAdapter } from "Shared"
import { Event } from "../../entities"

export class ModifyEventUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: ModifyEventAdapter): Promise<ModifyEventReplyDTO> {
		try {
			const { owner_id, date, place, artists, title, text, id } = inputs.event

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

			return await this.services.events.modify(event, inputs.file)
		} catch (error) {
			return new ModifyEventReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
