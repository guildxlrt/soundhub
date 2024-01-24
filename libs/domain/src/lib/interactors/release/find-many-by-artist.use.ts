import { UsecaseLayer, ServicesType, IDUsecaseParams } from "../../../assets"
import { FindReleasesByArtistReplyDTO, ErrorMsg } from "Shared"

export class FindReleasesByArtistUsecase extends UsecaseLayer {
	constructor(services: ServicesType, backend: boolean) {
		super(services, backend)
	}

	async execute(inputs: IDUsecaseParams): Promise<FindReleasesByArtistReplyDTO> {
		try {
			const id = inputs.id
			return await this.services.releases.findManyByArtist(id)
		} catch (error) {
			return new FindReleasesByArtistReplyDTO(
				undefined,
				new ErrorMsg(`Error: failed to persist`)
			)
		}
	}
}
