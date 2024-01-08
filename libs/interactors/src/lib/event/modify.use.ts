import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { ModifyEventReqDTO, ModifyEventReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer } from "../../assets"
import { Event, ModifyEventParams } from "Shared"

export class ModifyEventUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(inputs: ModifyEventReqDTO): Promise<ModifyEventReplyDTO> {
		try {
			const { date, place, artists, title, text } = inputs
			const eventData = new Event(
				undefined,
				undefined,
				date,
				place,
				artists,
				title,
				text,
				null
			)

			return await this.services.events.modify(new ModifyEventParams(eventData))
		} catch (error) {
			return new ModifyEventReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
