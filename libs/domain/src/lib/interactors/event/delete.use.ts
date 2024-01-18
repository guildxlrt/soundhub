import { DeleteEventParams, DeleteEventReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer, ServicesType } from "../../../assets"

export class DeleteEventUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: DeleteEventParams): Promise<DeleteEventReplyDTO> {
		try {
			return await this.services.events.delete(inputs)
		} catch (error) {
			return new DeleteEventReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
