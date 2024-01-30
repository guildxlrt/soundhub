import { IDParamsAdapter, Reply } from "../../assets"
import { ErrorHandler, ArtistShortDTO } from "Shared"
import { ArtistsService } from "../../services"

export class GetArtistByIDUsecase {
	artistsService: ArtistsService
	constructor(artistsService: ArtistsService) {
		this.artistsService = artistsService
	}

	async execute(input: IDParamsAdapter): Promise<Reply<ArtistShortDTO>> {
		try {
			const id = input.id
			const data = await this.artistsService.getByID(id)

			return new Reply<ArtistShortDTO>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
