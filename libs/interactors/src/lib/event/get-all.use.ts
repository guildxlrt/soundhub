import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../assets"
import { GetAllEventsReplyDTO } from "Dto"

export class GetAllEventsUsecase extends BaseUsecase {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(): Promise<GetAllEventsReplyDTO> {
		return await this.services.events.getAll()
	}
}
