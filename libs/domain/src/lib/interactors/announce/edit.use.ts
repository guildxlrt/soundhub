import { EditAnnounceReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer, ServicesType, AnnounceUsecaseParams } from "../../../assets"
import { Announce } from "../../entities"

export class EditAnnounceUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: AnnounceUsecaseParams): Promise<EditAnnounceReplyDTO> {
		try {
			const { owner_id, title, text, id } = inputs.data

			const data = new Announce(id as number, owner_id as number, title, text, null)

			return await this.services.announces.edit(data, inputs.file)
		} catch (error) {
			return new EditAnnounceReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
