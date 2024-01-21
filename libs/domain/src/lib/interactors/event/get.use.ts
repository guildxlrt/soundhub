import { GetEventReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer, ServicesType } from "../../../assets"
import { EntityID } from "Shared"

export class GetEventUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(id: EntityID): Promise<GetEventReplyDTO> {
		try {
			return await this.services.events.get(id)
		} catch (error) {
			return new GetEventReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
