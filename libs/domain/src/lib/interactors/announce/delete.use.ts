import { DeleteAnnounceParams, DeleteAnnounceReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer, ServicesType } from "../../../assets"

export class DeleteAnnounceUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: DeleteAnnounceParams): Promise<DeleteAnnounceReplyDTO> {
		try {
			return await this.services.announces.delete(inputs)
		} catch (error) {
			return new DeleteAnnounceReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
