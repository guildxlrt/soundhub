import { IDUsecaseParams } from "../../assets"
import { GetArtistByIDReplyDTO, ErrorMsg } from "Shared"
import { ArtistsService } from "../../services"

export class GetArtistByIDUsecase {
	artistsService: ArtistsService
	constructor(artistsService: ArtistsService) {
		this.artistsService = artistsService
	}

	async execute(input: IDUsecaseParams): Promise<GetArtistByIDReplyDTO> {
		try {
			const id = input.id
			return await this.artistsService.getByID(id)
		} catch (error) {
			return new GetArtistByIDReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
