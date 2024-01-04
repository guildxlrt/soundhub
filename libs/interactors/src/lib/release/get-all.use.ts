import { DatabaseServices } from "Infra-backend"
import { UsecaseLayer } from "../../assets"
import { GetAllReleasesReplyDTO } from "Dto"

export class GetAllReleasesUsecase extends UsecaseLayer {
	constructor(service: DatabaseServices) {
		super(service)
	}

	async execute(): Promise<GetAllReleasesReplyDTO> {
		return await this.services.releases.getAll()
	}
}
