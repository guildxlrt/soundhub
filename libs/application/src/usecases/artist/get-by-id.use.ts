import { IDUsecaseParams } from "../../assets"
import { GetArtistByIDReplyDTO, ErrorHandler } from "Shared"
import { ArtistsService } from "../../services"

export class GetArtistByIDUsecase {
	artistsService: ArtistsService
	constructor(artistsService: ArtistsService) {
		this.artistsService = artistsService
	}

	async execute(input: IDUsecaseParams): Promise<GetArtistByIDReplyDTO> {
		try {
			const id = input.id
			const data = await this.artistsService.getByID(id)

			return new GetArtistByIDReplyDTO(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
