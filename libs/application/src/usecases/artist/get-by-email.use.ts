import { GetArtistByEmailReplyDTO, ErrorHandler } from "Shared"
import { EmailUsecaseParams } from "../../assets"
import { ArtistsService } from "../../services"

export class GetArtistByEmailUsecase {
	artistsService: ArtistsService
	constructor(artistsService: ArtistsService) {
		this.artistsService = artistsService
	}

	async execute(input: EmailUsecaseParams): Promise<GetArtistByEmailReplyDTO> {
		try {
			const { email } = input

			const data = await this.artistsService.getByEmail(email)

			return new GetArtistByEmailReplyDTO(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
