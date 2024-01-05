import { DatabaseServices } from "Infra-backend"
import { UsecaseLayer } from "../../assets"
import { GetAllEventsReplyDTO } from "Dto"
import { ErrorMsg } from "Shared-utils"

export class GetAllEventsUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
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
