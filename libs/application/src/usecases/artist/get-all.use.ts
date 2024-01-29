import { GetAllArtistsReplyDTO, ErrorMsg, ErrorHandler } from "Shared"
import { ArtistsService } from "../../services"

export class GetAllArtistsUsecase {
	artistsService: ArtistsService
	constructor(artistsService: ArtistsService) {
		this.artistsService = artistsService
	}

	async execute(): Promise<GetAllArtistsReplyDTO> {
		try {
			const data = await this.artistsService.getAll()

			return new GetAllArtistsReplyDTO(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
