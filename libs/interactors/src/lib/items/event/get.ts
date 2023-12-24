import { DatabaseServices } from "Infra-backend"
import { GetEventInputDTO, GetEventReplyDTO } from "Dto"
import { BaseUsecase } from "../../../assets"

export class GetEventUsecase extends BaseUsecase<GetEventInputDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(id: GetEventInputDTO): Promise<GetEventReplyDTO> {
		return await this.service.event.get(id)
	}
}
