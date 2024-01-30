import { ErrorHandler, ReleaseShortDTO } from "Shared"
import { GenreType } from "Shared"
import { ReleasesService } from "../../services"
import { Reply } from "../../assets"

export class FindReleasesByGenreUsecase {
	releasesService: ReleasesService
	constructor(releasesService: ReleasesService) {
		this.releasesService = releasesService
	}

	async execute(input: { genre: GenreType }): Promise<Reply<ReleaseShortDTO[]>> {
		try {
			const genre = input.genre
			const data = await this.releasesService.findManyByGenre(genre)

			return new Reply<ReleaseShortDTO[]>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
