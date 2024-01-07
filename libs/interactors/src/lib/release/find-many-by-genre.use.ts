import { DatabaseServices } from "Infra-backend"
import { UsecaseLayer } from "../../assets"
import { FindReleasesByGenreInputDTO, FindReleasesByGenreReplyDTO, ErrorMsg } from "Shared"
import { GenreParams } from "Shared"

export class FindReleasesByGenreUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: FindReleasesByGenreInputDTO): Promise<FindReleasesByGenreReplyDTO> {
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
