import { DatabaseServices } from "Infra-backend"
import { CreateReleaseReplyDTO } from "Dto"

import { UsecaseLayer } from "../../assets"
import { NewReleaseParams } from "Domain"

export class CreateReleaseUsecase extends UsecaseLayer {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: NewReleaseParams): Promise<CreateReleaseReplyDTO> {
		return await this.services.releases.create(inputs)
	}
}
