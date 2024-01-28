import { GetAllReleasesReplyDTO, ErrorMsg } from "Shared"
import { ReleasesService } from "../../services"

export class GetAllReleasesUsecase {
	releasesService: ReleasesService
	constructor(releasesService: ReleasesService) {
		this.releasesService = releasesService
	}

	async execute(): Promise<GetAllReleasesReplyDTO> {
		try {
			return await this.releasesService.getAll()
		} catch (error) {
			return new GetAllReleasesReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
