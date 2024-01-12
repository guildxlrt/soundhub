import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { ModifyAnnounceReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer } from "../../assets"
import { ModifyAnnounceParams } from "Shared"

export class ModifyAnnounceUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(inputs: ModifyAnnounceParams): Promise<ModifyAnnounceReplyDTO> {
		try {
			return await this.services.announces.modify(inputs)
		} catch (error) {
			return new ModifyAnnounceReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
