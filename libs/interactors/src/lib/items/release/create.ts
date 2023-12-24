import { DatabaseServices } from "Infra-backend"
import { CreateReleaseInputDTO, CreateReleaseReplyDTO } from "Dto"

import { BaseUsecase } from "../../../assets"

export class CreateReleaseUsecase extends BaseUsecase<CreateReleaseInputDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(input: CreateReleaseInputDTO): Promise<CreateReleaseReplyDTO> {
		return await this.service.release.create(input)
	}
}
