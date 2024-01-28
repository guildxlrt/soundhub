import { IDUsecaseParams } from "../../assets"
import { GetReleaseReplyDTO, ErrorMsg } from "Shared"
import { ReleasesService } from "../../services"

export class GetReleaseUsecase {
	releasesService: ReleasesService
	constructor(releasesService: ReleasesService) {
		this.releasesService = releasesService
	}

	async execute(input: IDUsecaseParams): Promise<GetReleaseReplyDTO> {
		try {
			const id = input.id
			return await this.releasesService.get(id)
		} catch (error) {
			return new GetReleaseReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
