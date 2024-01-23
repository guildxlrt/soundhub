import { UsecaseLayer, ServicesType, IDUsecaseParams } from "../../../assets"
import { FindAnnouncesByArtistReplyDTO, ErrorMsg } from "Shared"

export class FindAnnouncesByArtistUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: IDUsecaseParams): Promise<FindAnnouncesByArtistReplyDTO> {
		try {
			const id = inputs.id

			return await this.services.announces.findManyByArtist(id)
		} catch (error) {
			return new FindAnnouncesByArtistReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
