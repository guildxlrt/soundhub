import { UsecaseLayer, ServicesType } from "../../../assets"
import { GetAllEventsReplyDTO, ErrorMsg } from "Shared"

export class GetAllEventsUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(): Promise<GetAllEventsReplyDTO> {
		try {
			return await this.services.events.getAll()
		} catch (error) {
			return new GetAllEventsReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
