import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { CreateAnnounceReqDTO, CreateAnnounceReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer } from "../../assets"
import { Announce, NewAnnounceParams } from "Shared"

export class CreateAnnounceUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(inputs: CreateAnnounceReqDTO): Promise<CreateAnnounceReplyDTO> {
		try {
			const { title, text, artist_id } = inputs
			const announceData = new Announce(undefined, artist_id, title, text, null, null)

			return await this.services.announces.create(new NewAnnounceParams(announceData))
		} catch (error) {
			return new CreateAnnounceReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
