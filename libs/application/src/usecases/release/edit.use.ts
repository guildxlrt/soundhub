import { UsecaseLayer, RepositoriesType, EditReleaseUsecaseParams } from "../../assets"
import { EditReleaseReplyDTO, ErrorMsg, formatters } from "Shared"
import { Release, Song } from "Domain"

export class EditReleaseUsecase {
	constructor(services: RepositoriesType) {
		super(services)
	}

	async execute(input: EditReleaseUsecaseParams): Promise<EditReleaseReplyDTO> {
		try {
			const { songs, release } = input
			const { cover, data } = release

			return await this.services.releases.edit({ data: data, cover }, songs)
		} catch (error) {
			return new EditReleaseReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
