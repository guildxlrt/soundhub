import { FindReleasesByGenreReplyDTO, ErrorHandler } from "Shared"
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
			const data = await this.releasesService.findManyByGenre(genre)

			return new FindReleasesByGenreReplyDTO(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
