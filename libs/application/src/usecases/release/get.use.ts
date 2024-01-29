import { IDUsecaseParams } from "../../assets"
import { GetReleaseReplyDTO, ErrorHandler } from "Shared"
import { ReleasesService } from "../../services"

export class GetReleaseUsecase {
	releasesService: ReleasesService
	constructor(releasesService: ReleasesService) {
		this.releasesService = releasesService
	}

	async execute(input: IDUsecaseParams): Promise<GetReleaseReplyDTO> {
		try {
			const id = input.id
			const data = await this.releasesService.get(id)
			return new GetReleaseReplyDTO(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
