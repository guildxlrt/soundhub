import { UsecaseLayer, RepositoriesType } from "../../assets"
import { GetAllReleasesReplyDTO, ErrorMsg } from "Shared"

export class GetAllReleasesUsecase {
	constructor(services: RepositoriesType) {
		super(services)
	}

	async execute(): Promise<GetAllReleasesReplyDTO> {
		try {
			return await this.services.releases.getAll()
		} catch (error) {
			return new GetAllReleasesReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
