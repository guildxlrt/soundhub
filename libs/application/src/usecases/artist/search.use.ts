import { GetArtistShortDTO, ErrorHandler, GenreType } from "Shared"
import { ArtistsService } from "../../services"
import { UsecaseReply } from "../../utils"

export class SearchArtistsUsecase {
	mainService: ArtistsService
	constructor(mainService: ArtistsService) {
		this.mainService = mainService
	}

	async execute(genre: GenreType, country: string): Promise<UsecaseReply<GetArtistShortDTO[]>> {
		try {
			const data = await this.mainService.search(genre, country)

			return new UsecaseReply<GetArtistShortDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
