import { UsecaseLayer, RepositoriesType } from "../../assets"
import { GetAllEventsReplyDTO, ErrorMsg } from "Shared"

export class GetAllEventsUsecase {
	constructor(services: RepositoriesType) {
		super(services)
	}

	async execute(): Promise<GetAllEventsReplyDTO> {
		try {
			return await this.services.events.getAll()
		} catch (error) {
			return new GetAllEventsReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
