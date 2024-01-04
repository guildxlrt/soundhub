import { DatabaseServices } from "Infra-backend"
import { DeleteEventReplyDTO } from "Dto"
import { UsecaseLayer } from "../../assets"
import { IdParams } from "Domain"

export class DeleteEventUsecase extends UsecaseLayer {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: IdParams): Promise<DeleteEventReplyDTO> {
		return await this.services.events.delete(inputs)
	}
}