import { DatabaseServices } from "Infra-backend"
import { UsecaseLayer } from "../../assets"
import { GetAllAnnouncesReplyDTO } from "Dto"
import { ErrorMsg } from "Shared-utils"

export class GetAllAnnouncesUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
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
