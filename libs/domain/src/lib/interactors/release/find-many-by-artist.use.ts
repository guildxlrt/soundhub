import { UsecaseLayer, ServicesType, IDUsecaseParams } from "../../../assets"
import { FindReleasesByArtistReplyDTO, ErrorMsg } from "Shared"

export class FindReleasesByArtistUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: IDUsecaseParams): Promise<FindReleasesByArtistReplyDTO> {
		try {
			const id = inputs.id
			return await this.services.releases.findManyByArtist(id)
		} catch (error) {
			return new FindReleasesByArtistReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
