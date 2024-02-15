import { UsecaseReply } from "../../utils"
import { GetArtistShortDTO, ErrorHandler } from "Shared"
import { ArtistsService } from "../../services"
import { CountryUsecaseParams } from "../../adapters"

export class FindArtistsByCountryUsecase {
	mainService: ArtistsService
	constructor(mainService: ArtistsService) {
		this.mainService = mainService
	}

	async execute(input: CountryUsecaseParams): Promise<UsecaseReply<GetArtistShortDTO[]>> {
		try {
			const country = input.country

			const data = await this.mainService.findByCountry(country)
			return new UsecaseReply<GetArtistShortDTO[]>(data, null)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
