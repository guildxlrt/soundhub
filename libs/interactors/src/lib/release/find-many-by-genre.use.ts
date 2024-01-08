import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { UsecaseLayer } from "../../assets"
import { FindReleasesByGenreReqDTO, FindReleasesByGenreReplyDTO, ErrorMsg } from "Shared"
import { GenreParams } from "Shared"

export class FindReleasesByGenreUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(inputs: FindReleasesByGenreReqDTO): Promise<FindReleasesByGenreReplyDTO> {
		try {
			return await this.services.releases.findManyByGenre(new GenreParams(inputs))
		} catch (error) {
			return new FindReleasesByGenreReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
