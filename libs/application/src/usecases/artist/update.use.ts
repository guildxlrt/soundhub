import { UpdateArtistReplyDTO } from "Shared"
import { UpdateArtistUsecaseParams } from "../../assets"
import { ErrorMsg } from "Shared"
import { Artist } from "Domain"
import { ArtistsService } from "../../services"

export class UpdateArtistUsecase {
	artistsService: ArtistsService
	constructor(artistsService: ArtistsService) {
		this.artistsService = artistsService
	}

	async execute(input: UpdateArtistUsecaseParams): Promise<UpdateArtistReplyDTO> {
		try {
			const { genres, name, bio, members, user_auth_id } = input.data.profile

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

			return await this.artistsService.update(
				{ profile: userData, userAuth: user_auth_id as number },
				input.file
			)
		} catch (error) {
			return new UpdateArtistReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
