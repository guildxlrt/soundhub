import { DeleteEventReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer, ServicesType, DeleteEventUsecaseParams } from "../../../assets"

export class DeleteEventUsecase extends UsecaseLayer {
	constructor(services: ServicesType, backend: boolean) {
		super(services, backend)
	}

	async execute(inputs: DeleteEventUsecaseParams): Promise<DeleteEventReplyDTO> {
		try {
			const { id, ownerID } = inputs
			return await this.services.events.delete(id, ownerID as number)
		} catch (error) {
			return new DeleteEventReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
