import { DatabaseServices } from "Infra-backend"
import { ModifyAnnounceInputDTO, ModifyAnnounceReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer } from "../../assets"
import { Announce, ModifyAnnounceParams } from "Shared"

export class ModifyAnnounceUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: ModifyAnnounceInputDTO): Promise<ModifyAnnounceReplyDTO> {
		try {
			const { title, text } = inputs
			const announceData = new Announce(undefined, undefined, title, text, null, null)

			return await this.services.announces.modify(new ModifyAnnounceParams(announceData))
		} catch (error) {
			return new ModifyAnnounceReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
