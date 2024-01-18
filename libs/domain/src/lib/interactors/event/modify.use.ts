import { ModifyEventReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer, ServicesType } from "../../../assets"
import { ModifyEventParams } from "Shared"

export class ModifyEventUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
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
