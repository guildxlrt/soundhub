import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { UsecaseLayer } from "../../assets"
import { FindReleasesByArtistReqDTO, FindReleasesByArtistReplyDTO, ErrorMsg } from "Shared"
import { IdParams } from "Shared"

export class FindReleasesByArtistUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(inputs: FindReleasesByArtistReqDTO): Promise<FindReleasesByArtistReplyDTO> {
		try {
			return await this.services.releases.findManyByArtist(new IdParams(inputs.id))
		} catch (error) {
			return new FindReleasesByArtistReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
