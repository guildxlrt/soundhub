import { ErrorHandler, GetShortReleaseDTO } from "Shared"
import { ReleasesService } from "../../services"
import { UsecaseReply } from "../../utils"
import { GenreUsecaseParams } from "../params-adapters"

export class FindReleasesByGenreUsecase {
	mainService: ReleasesService
	constructor(mainService: ReleasesService) {
		this.mainService = mainService
	}

	async execute(input: GenreUsecaseParams): Promise<UsecaseReply<GetShortReleaseDTO[]>> {
		try {
			const genre = input.genre
			const data = await this.mainService.findManyByGenre(genre)

			return new UsecaseReply<GetShortReleaseDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
