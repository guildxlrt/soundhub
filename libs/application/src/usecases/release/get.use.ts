import { UsecaseLayer, RepositoriesType, IDUsecaseParams } from "../../assets"
import { GetReleaseReplyDTO, ErrorMsg } from "Shared"

export class GetReleaseUsecase {
	constructor(services: RepositoriesType) {
		super(services)
	}

	async execute(input: IDUsecaseParams): Promise<GetReleaseReplyDTO> {
		try {
			const id = input.id
			return await this.services.releases.get(id)
		} catch (error) {
			return new GetReleaseReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
