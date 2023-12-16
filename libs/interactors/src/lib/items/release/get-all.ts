import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../../assets"
import { GetAllReleasesDTO } from "Dto"

export class GetAllReleasesUsecase extends BaseUsecase<GetAllReleasesDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: GetAllReleasesDTO): Promise<GetAllReleasesDTO> {
		return await this.service.release.getAll(inputs)
	}
}
