import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { CreateAnnounceReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer } from "../../assets"
import { NewAnnounceParams } from "Shared"

export class CreateAnnounceUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(inputs: NewAnnounceParams): Promise<CreateAnnounceReplyDTO> {
		try {
			return await this.services.announces.create(inputs)
		} catch (error) {
			return new CreateAnnounceReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
