import { DatabaseServices } from "Infra-backend"
import { CreateAnnounceInputDTO, CreateAnnounceReplyDTO } from "Dto"
import { UsecaseLayer } from "../../assets"
import { Announce, NewAnnounceParams } from "Domain"
import { ErrorMsg } from "Shared-utils"

export class CreateAnnounceUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: CreateAnnounceInputDTO): Promise<CreateAnnounceReplyDTO> {
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
