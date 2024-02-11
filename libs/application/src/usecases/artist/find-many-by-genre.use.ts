import { UsecaseReply } from "../../utils"
import { GetArtistShortDTO, ErrorHandler } from "Shared"
import { ArtistsService } from "../../services"
import { GenreUsecaseParams } from "../../adapters"

export class FindArtistsByGenreUsecase {
	mainService: ArtistsService
	constructor(mainService: ArtistsService) {
		this.mainService = mainService
	}

	async execute(input: GenreUsecaseParams): Promise<UsecaseReply<GetArtistShortDTO[]>> {
		try {
			const genre = input.genre

			const data = await this.mainService.findManyByGenre(genre)
			return new UsecaseReply<GetArtistShortDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
