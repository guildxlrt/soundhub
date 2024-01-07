import { DatabaseServices } from "Infra-backend"
import { UsecaseLayer } from "../../assets"
import { FindAnnouncesByArtistInputDTO, FindAnnouncesByArtistReplyDTO, ErrorMsg } from "Shared"
import { IdParams } from "Shared"

export class FindAnnouncesByArtistUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: FindAnnouncesByArtistInputDTO): Promise<FindAnnouncesByArtistReplyDTO> {
		try {
			return await this.services.announces.findManyByArtist(new IdParams(inputs.id))
		} catch (error) {
			return new FindAnnouncesByArtistReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
