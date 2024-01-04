import { DatabaseServices } from "Infra-backend"
import { DeleteAnnounceReplyDTO } from "Dto"
import { UsecaseLayer } from "../../assets"
import { IdParams } from "Domain"

export class DeleteAnnounceUsecase extends UsecaseLayer {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: IdParams): Promise<DeleteAnnounceReplyDTO> {
		return await this.services.announces.delete(inputs)
	}
}
