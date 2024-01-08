import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { UsecaseLayer } from "../../assets"
import { GetAllReleasesReplyDTO, ErrorMsg } from "Shared"

export class GetAllReleasesUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(): Promise<GetAllReleasesReplyDTO> {
		try {
			return await this.services.releases.getAll()
		} catch (error) {
			return new GetAllReleasesReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
