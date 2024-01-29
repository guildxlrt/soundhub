import { ErrorHandler, UpdateArtistReplyDTO } from "Shared"
import { UpdateArtistUsecaseParams } from "../../assets"
import { Artist } from "Domain"
import { ArtistsService } from "../../services"

export class UpdateArtistUsecase {
	artistsService: ArtistsService
	constructor(artistsService: ArtistsService) {
		this.artistsService = artistsService
	}

	async execute(input: UpdateArtistUsecaseParams): Promise<UpdateArtistReplyDTO> {
		try {
			const { genres, name, bio, members, user_auth_id } = input.profile

			// Saving
			const userData = new Artist(
				null,
				user_auth_id as number,
				name,
				bio,
				members,
				genres,
				null
			)

			const data = await this.artistsService.update(
				{ profile: userData, userAuth: user_auth_id as number },
				input.file
			)

			return new UpdateArtistReplyDTO(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
