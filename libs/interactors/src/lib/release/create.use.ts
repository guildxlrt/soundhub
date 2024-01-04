import { DatabaseServices } from "Infra-backend"
import { CreateReleaseReplyDTO } from "Dto"

import { BaseUsecase } from "../../assets"
import { NewReleaseParams } from "Domain"

export class CreateReleaseUsecase extends BaseUsecase {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: NewReleaseParams): Promise<CreateReleaseReplyDTO> {
		return await this.services.releases.create(inputs)
	}
}
