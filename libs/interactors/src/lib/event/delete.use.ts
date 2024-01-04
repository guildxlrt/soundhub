import { DatabaseServices } from "Infra-backend"
import { DeleteEventReplyDTO } from "Dto"
import { BaseUsecase } from "../../assets"
import { IdParams } from "Domain"

export class DeleteEventUsecase extends BaseUsecase {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: IdParams): Promise<DeleteEventReplyDTO> {
		return await this.services.events.delete(inputs)
	}
}
