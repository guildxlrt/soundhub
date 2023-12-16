import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../../assets"
import { GetUserReleasesDTO } from "Dto"

export class GetUserReleasesUsecase extends BaseUsecase<GetUserReleasesDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(inputs: GetUserReleasesDTO): Promise<GetUserReleasesDTO> {
		return await this.service.release.getUserReleases(inputs)
	}
}
