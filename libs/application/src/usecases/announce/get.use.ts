import { GetAnnounceReplyDTO, ErrorMsg } from "Shared"
import { UsecaseLayer, RepositoriesType, IDUsecaseParams } from "../../assets"

export class GetAnnounceUsecase {
	constructor(services: RepositoriesType) {
		super(services)
	}

	async execute(input: IDUsecaseParams): Promise<GetAnnounceReplyDTO> {
		try {
			const id = input.id

			return await this.services.announces.get(id)
		} catch (error) {
			return new GetAnnounceReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
