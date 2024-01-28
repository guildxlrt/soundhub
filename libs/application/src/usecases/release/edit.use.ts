import { EditReleaseUsecaseParams } from "../../assets"
import { EditReleaseReplyDTO, ErrorMsg } from "Shared"
import { ReleasesService } from "../../services"

export class EditReleaseUsecase {
	releasesService: ReleasesService
	constructor(releasesService: ReleasesService) {
		this.releasesService = releasesService
	}

	async execute(input: EditReleaseUsecaseParams): Promise<EditReleaseReplyDTO> {
		try {
			const { songs, release } = input
			const { cover, data } = release

			return await this.releasesService.edit({ data: data, cover }, songs)
		} catch (error) {
			return new EditReleaseReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
