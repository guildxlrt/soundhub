import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { UsecaseLayer } from "../../assets"
import { FindAnnouncesByArtistReqDTO, FindAnnouncesByArtistReplyDTO, ErrorMsg } from "Shared"
import { IdParams } from "Shared"

export class FindAnnouncesByArtistUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(inputs: FindAnnouncesByArtistReqDTO): Promise<FindAnnouncesByArtistReplyDTO> {
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
