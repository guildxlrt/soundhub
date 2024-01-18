import { ModifyAnnounceReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer, ServicesType } from "../../../assets"
import { ModifyAnnounceParams } from "Shared"

export class ModifyAnnounceUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
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
