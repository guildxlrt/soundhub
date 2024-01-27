import { GetEventReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer, RepositoriesType, IDUsecaseParams } from "../../assets"

export class GetEventUsecase {
	constructor(services: RepositoriesType) {
		super(services)
	}

	async execute(input: IDUsecaseParams): Promise<GetEventReplyDTO> {
		try {
			const id = input.id
			return await this.services.events.get(id)
		} catch (error) {
			return new GetEventReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
