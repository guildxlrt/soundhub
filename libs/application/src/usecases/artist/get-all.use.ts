import { ArtistShortestDTO, ErrorHandler } from "Shared"
import { ArtistsService } from "../../services"
import { Reply } from "../../assets"

export class GetAllArtistsUsecase {
	artistsService: ArtistsService
	constructor(artistsService: ArtistsService) {
		this.artistsService = artistsService
	}

	async execute(): Promise<Reply<ArtistShortestDTO[]>> {
		try {
			const data = await this.artistsService.getAll()

			return new Reply<ArtistShortestDTO[]>(data)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
