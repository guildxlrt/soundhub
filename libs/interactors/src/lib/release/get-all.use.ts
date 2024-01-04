import { DatabaseServices } from "Infra-backend"
import { BaseUsecase } from "../../assets"
import { GetAllReleasesReplyDTO } from "Dto"

export class GetAllReleasesUsecase extends BaseUsecase {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(): Promise<GetAllReleasesReplyDTO> {
		return await this.services.releases.getAll()
	}
}
