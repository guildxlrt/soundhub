import { DatabaseServices } from "Infra-backend"
import { DeleteAnnounceReplyDTO } from "Dto"
import { BaseUsecase } from "../../assets"
import { IdParams } from "Domain"

export class DeleteAnnounceUsecase extends BaseUsecase {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: IdParams): Promise<DeleteAnnounceReplyDTO> {
		return await this.services.announces.delete(inputs)
	}
}
