import { CreateReleaseReplyDTO, ErrorMsg, formatters } from "Shared"
import { UsecaseLayer, ServicesType, NewReleaseUsecaseParams } from "../../../assets"

import { Release, Song } from "Domain"

export class CreateReleaseUsecase extends UsecaseLayer {
	constructor(services: ServicesType, backend: boolean) {
		super(services, backend)
	}

	async execute(inputs: NewReleaseUsecaseParams): Promise<CreateReleaseReplyDTO> {
		try {
			const { songs, release } = inputs
			const { cover, data } = release

			return await this.services.releases.create({ data: data, cover }, songs)
		} catch (error) {
			return new CreateReleaseReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
