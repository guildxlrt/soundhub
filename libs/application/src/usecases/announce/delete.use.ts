import { DeleteAnnounceReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer, RepositoriesType, DeleteAnnounceUsecaseParams } from "../../assets"

export class DeleteAnnounceUsecase {
	constructor(services: RepositoriesType) {
		super(services)
	}

	async execute(input: DeleteAnnounceUsecaseParams): Promise<DeleteAnnounceReplyDTO> {
		try {
			const { id, ownerID } = input

			return await this.services.announces.delete(id, ownerID as number)
		} catch (error) {
			return new DeleteAnnounceReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
