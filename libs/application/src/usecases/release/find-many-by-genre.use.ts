import { ErrorHandler, ReleaseShortDTO } from "Shared"
import { GenreType } from "Shared"
import { ReleasesService } from "../../services"
import { UsecaseReply } from "../../utils"

export class FindReleasesByGenreUsecase {
	mainService: ReleasesService
	constructor(mainService: ReleasesService) {
		this.mainService = mainService
	}

	async execute(input: { genre: GenreType }): Promise<UsecaseReply<ReleaseShortDTO[]>> {
		try {
			const genre = input.genre
			const data = await this.mainService.findManyByGenre(genre)

			return new UsecaseReply<ReleaseShortDTO[]>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
