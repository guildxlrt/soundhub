import { DatabaseServices } from "Infra-backend"
import { DeleteEventInputDTO, DeleteEventReplyDTO } from "Dto"
import { BaseUsecase } from "../../../assets"

export class DeleteEventUsecase extends BaseUsecase<DeleteEventInputDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(input: DeleteEventInputDTO): Promise<DeleteEventReplyDTO> {
		return await this.service.event.delete(input)
	}
}
