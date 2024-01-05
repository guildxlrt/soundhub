import { DatabaseServices } from "Infra-backend"
import { UsecaseLayer } from "../../assets"
import { FindReleasesByArtistInputDTO, FindReleasesByArtistReplyDTO } from "Dto"
import { IdParams } from "Domain"
import { ErrorMsg } from "Shared-utils"

export class FindReleasesByArtistUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: FindReleasesByArtistInputDTO): Promise<FindReleasesByArtistReplyDTO> {
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
