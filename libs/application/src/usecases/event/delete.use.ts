import { DeleteEventReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer, RepositoriesType, DeleteEventUsecaseParams } from "../../assets"

export class DeleteEventUsecase {
	constructor(services: RepositoriesType) {
		super(services)
	}

	async execute(input: DeleteEventUsecaseParams): Promise<DeleteEventReplyDTO> {
		try {
			const { id, ownerID } = input
			return await this.services.events.delete(id, ownerID as number)
		} catch (error) {
			return new DeleteEventReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
