import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { ModifyEventReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer } from "../../assets"
import { ModifyEventParams } from "Shared"

export class ModifyEventUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(inputs: ModifyEventParams): Promise<ModifyEventReplyDTO> {
		try {
			return await this.services.events.modify(inputs)
		} catch (error) {
			return new ModifyEventReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
