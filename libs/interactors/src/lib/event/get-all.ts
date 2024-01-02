import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../assets"
import { GetAllEventsInputDTO, GetAllEventsReplyDTO } from "Dto"

export class GetAllEventsUsecase extends BaseUsecase<GetAllEventsInputDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(): Promise<GetAllEventsReplyDTO> {
		return await this.service.event.getAll()
	}
}
