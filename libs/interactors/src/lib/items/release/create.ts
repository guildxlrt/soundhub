import { DatabaseServices } from "Infra-backend"
import { CreateReleaseDTO } from "Dto"

import { BaseUsecase } from "../../../assets"

export class CreateReleaseUsecase extends BaseUsecase<CreateReleaseDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: CreateReleaseDTO): Promise<CreateReleaseDTO> {
		return await this.service.release.create(inputs)
	}
}
