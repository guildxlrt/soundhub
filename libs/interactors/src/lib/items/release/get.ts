import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../../assets"
import { GetReleaseInputDTO, GetReleaseReplyDTO } from "Dto"

export class GetReleaseUsecase extends BaseUsecase<GetReleaseInputDTO> {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(input: GetReleaseInputDTO): Promise<GetReleaseReplyDTO> {
		return await this.service.release.get(input)
	}
}
