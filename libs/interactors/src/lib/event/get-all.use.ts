import { DatabaseServices } from "Infra-backend"
import { UsecaseLayer } from "../../assets"
import { GetAllEventsReplyDTO } from "Dto"

export class GetAllEventsUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(): Promise<GetAllEventsReplyDTO> {
		return await this.services.events.getAll()
	}
}
