import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../../assets"
import { GetReleaseDTO } from "Dto"

export class GetReleaseUsecase extends BaseUsecase<GetReleaseDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: GetReleaseDTO): Promise<GetReleaseDTO> {
		return await this.service.release.get(inputs)
	}
}
