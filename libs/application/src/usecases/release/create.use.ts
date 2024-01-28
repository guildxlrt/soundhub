import { CreateReleaseReplyDTO, ErrorMsg } from "Shared"
import { NewReleaseUsecaseParams } from "../../assets"
import { ReleasesService } from "../../services"

export class CreateReleaseUsecase {
	releasesService: ReleasesService
	constructor(releasesService: ReleasesService) {
		this.releasesService = releasesService
	}
	async execute(input: NewReleaseUsecaseParams): Promise<CreateReleaseReplyDTO> {
		try {
			const { songs, release } = input
			const { cover, data } = release

			return await this.releasesService.create({ data: data, cover }, songs)
		} catch (error) {
			return new CreateReleaseReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
