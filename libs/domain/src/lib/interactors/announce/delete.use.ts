import { DeleteAnnounceReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer, ServicesType, DeleteAnnounceUsecaseParams } from "../../../assets"

export class DeleteAnnounceUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: DeleteAnnounceUsecaseParams): Promise<DeleteAnnounceReplyDTO> {
		try {
			const { id, ownerID } = inputs

			return await this.services.announces.delete(id, ownerID as number)
		} catch (error) {
			return new DeleteAnnounceReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
