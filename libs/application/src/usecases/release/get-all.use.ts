import { GetAllReleasesReplyDTO, ErrorMsg, ErrorHandler } from "Shared"
import { ReleasesService } from "../../services"

export class GetAllReleasesUsecase {
	releasesService: ReleasesService
	constructor(releasesService: ReleasesService) {
		this.releasesService = releasesService
	}

	async execute(): Promise<GetAllReleasesReplyDTO> {
		try {
			const data = await this.releasesService.getAll()
			return new GetAllReleasesReplyDTO(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
