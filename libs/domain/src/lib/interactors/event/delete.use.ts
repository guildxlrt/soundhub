import { DeleteEventReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer, ServicesType, DeleteEventUsecaseParams } from "../../../assets"

export class DeleteEventUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: DeleteEventUsecaseParams): Promise<DeleteEventReplyDTO> {
		try {
			const { id, ownerID } = inputs
			return await this.services.events.delete(id, ownerID as number)
		} catch (error) {
			return new DeleteEventReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
