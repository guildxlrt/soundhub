import { GetArtistByEmailReplyDTO, ErrorMsg } from "Shared"
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
			return await this.artistsService.getByEmail(email)
		} catch (error) {
			return new GetArtistByEmailReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
