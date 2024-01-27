import { UpdateArtistReplyDTO } from "Shared"
import { UsecaseLayer, RepositoriesType, UpdateArtistUsecaseParams } from "../../assets"
import { ErrorMsg } from "Shared"
import { Artist } from "Domain"

export class UpdateArtistUsecase {
	constructor(services: RepositoriesType) {
		super(services)
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

			return await this.services.artists.update(
				{ profile: userData, userAuth: user_auth_id as number },
				input.file
			)
		} catch (error) {
			return new UpdateArtistReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
