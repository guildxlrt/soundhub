import { FindReleasesByGenreReplyDTO, ErrorMsg } from "Shared"
import { GenreType } from "Shared"
import { ReleasesService } from "../../services"

export class FindReleasesByGenreUsecase {
	releasesService: ReleasesService
	constructor(releasesService: ReleasesService) {
		this.releasesService = releasesService
	}

	async execute(input: { genre: GenreType }): Promise<FindReleasesByGenreReplyDTO> {
		try {
			const genre = input.genre
			return await this.releasesService.findManyByGenre(genre)
		} catch (error) {
			return new FindReleasesByGenreReplyDTO(
				undefined,
				new ErrorMsg(`Error: failed to persist`)
			)
		}
	}
}
