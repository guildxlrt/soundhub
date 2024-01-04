import { DatabaseServices } from "Infra-backend"
import { GetAnnounceReplyDTO } from "Dto"
import { UsecaseLayer } from "../../assets"
import { IdParams } from "Domain"

export class GetAnnounceUsecase extends UsecaseLayer {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: IdParams): Promise<GetAnnounceReplyDTO> {
		return await this.services.announces.get(inputs)
	}
}
