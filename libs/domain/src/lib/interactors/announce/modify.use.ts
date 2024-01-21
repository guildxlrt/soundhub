import { ModifyAnnounceReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer, ServicesType } from "../../../assets"
import { ModifyAnnounceAdapter } from "Shared"
import { Announce } from "../../entities"

export class ModifyAnnounceUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: ModifyAnnounceAdapter): Promise<ModifyAnnounceReplyDTO> {
		try {
			const { owner_id, title, text, id } = inputs.data

			const data = new Announce(id as number, owner_id as number, title, text, null)

			return await this.services.announces.modify(data, inputs.file)
		} catch (error) {
			return new ModifyAnnounceReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
