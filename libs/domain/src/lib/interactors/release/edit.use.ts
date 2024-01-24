import { UsecaseLayer, ServicesType, EditReleaseUsecaseParams } from "../../../assets"
import { EditReleaseReplyDTO, ErrorMsg, formatters } from "Shared"
import { Release, Song } from "../../entities"

export class EditReleaseUsecase extends UsecaseLayer {
	constructor(services: ServicesType, backend: boolean) {
		super(services, backend)
	}

	async execute(inputs: EditReleaseUsecaseParams): Promise<EditReleaseReplyDTO> {
		try {
			const { songs, release } = inputs
			const { cover, data } = release

			return await this.services.releases.edit({ data: data, cover }, songs)
		} catch (error) {
			return new EditReleaseReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
