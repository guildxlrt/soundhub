import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../assets"
import { GetReleaseReplyDTO } from "Dto"
import { IdParams } from "Domain"

export class GetReleaseUsecase extends BaseUsecase {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: IdParams): Promise<GetReleaseReplyDTO> {
		return await this.services.releases.get(inputs)
	}
}
