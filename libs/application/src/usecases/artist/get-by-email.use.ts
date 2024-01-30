import { ErrorHandler, ArtistShortDTO } from "Shared"
import { EmailParamsAdapter, Reply } from "../../assets"
import { ArtistsService } from "../../services"

export class GetArtistByEmailUsecase {
	artistsService: ArtistsService
	constructor(artistsService: ArtistsService) {
		this.artistsService = artistsService
	}

	async execute(input: EmailParamsAdapter): Promise<Reply<ArtistShortDTO>> {
		try {
			const { email } = input

			const data = await this.artistsService.getByEmail(email)

			return new Reply<ArtistShortDTO>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
