import { DatabaseServices } from "Infra-backend"
import { UsecaseLayer } from "../../assets"
import { GetReleaseReplyDTO } from "Dto"
import { IdParams } from "Domain"

export class GetReleaseUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: IdParams): Promise<GetReleaseReplyDTO> {
		return await this.services.releases.get(inputs)
	}
}
