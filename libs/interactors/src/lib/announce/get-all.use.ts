import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { UsecaseLayer } from "../../assets"
import { GetAllAnnouncesReplyDTO, ErrorMsg } from "Shared"

export class GetAllAnnouncesUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(): Promise<GetAllAnnouncesReplyDTO> {
		try {
			return await this.services.announces.getAll()
		} catch (error) {
			return new GetAllAnnouncesReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
