import { CreateReleaseReplyDTO, ErrorMsg, formatters } from "Shared"
import { UsecaseLayer, RepositoriesType, NewReleaseUsecaseParams } from "../../assets"

import { Release, Song } from "Domain"

export class CreateReleaseUsecase {
	constructor(services: RepositoriesType) {
		super(services)
	}

	async execute(input: NewReleaseUsecaseParams): Promise<CreateReleaseReplyDTO> {
		try {
			const { songs, release } = input
			const { cover, data } = release

			return await this.services.releases.create({ data: data, cover }, songs)
		} catch (error) {
			return new CreateReleaseReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
