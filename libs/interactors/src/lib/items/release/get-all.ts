import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../../assets"
import { GetAllReleasesInputDTO, GetAllReleasesReplyDTO } from "Dto"

export class GetAllReleasesUsecase extends BaseUsecase<GetAllReleasesInputDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(input: GetAllReleasesInputDTO): Promise<GetAllReleasesReplyDTO> {
		return await this.service.release.getAll(input)
	}
}
