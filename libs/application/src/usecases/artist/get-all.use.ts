import { GetAllArtistsReplyDTO, ErrorMsg } from "Shared"
import { ArtistsService } from "../../services"

export class GetAllArtistsUsecase {
	artistsService: ArtistsService
	constructor(artistsService: ArtistsService) {
		this.artistsService = artistsService
	}

	async execute(): Promise<GetAllArtistsReplyDTO> {
		try {
			return await this.artistsService.getAll()
		} catch (error) {
			return new GetAllArtistsReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
