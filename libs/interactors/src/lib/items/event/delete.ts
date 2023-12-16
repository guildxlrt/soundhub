import { DatabaseServices } from "Infra-backend"
import { DeleteEventsDTO } from "Dto"
import { BaseUsecase } from "../../../assets"

export class DeleteEventUsecase extends BaseUsecase<DeleteEventsDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: DeleteEventsDTO): Promise<DeleteEventsDTO> {
		return await this.service.event.delete(inputs)
	}
}
