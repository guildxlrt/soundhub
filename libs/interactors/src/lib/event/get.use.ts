import { DatabaseServices } from "Infra-backend"
import { GetEventReplyDTO } from "Dto"
import { UsecaseLayer } from "../../assets"
import { IdParams } from "Domain"

export class GetEventUsecase extends UsecaseLayer {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: IdParams): Promise<GetEventReplyDTO> {
		return await this.services.events.get(inputs)
	}
}
