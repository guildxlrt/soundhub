import { UpdateArtistReplyDTO, formatters } from "Shared"
import { UsecaseLayer, ServicesType, UpdateArtistUsecaseParams } from "../../../assets"
import { ErrorMsg } from "Shared"
import { Artist } from "../../entities"

export class UpdateArtistUsecase extends UsecaseLayer {
	constructor(services: ServicesType, backend: boolean) {
		super(services, backend)
	}

	async execute(inputs: UpdateArtistUsecaseParams): Promise<UpdateArtistReplyDTO> {
		try {
			const { genres, name, bio, members, user_auth_id } = inputs.profile

			// SANITIZE
			// genres
			const cleanGenres = formatters.genres(genres, this.backend)
			// others data checking
			// ... ( name)

			// Saving
			const userData = new Artist(
				null,
				user_auth_id as number,
				name,
				bio,
				members,
				cleanGenres,
				null
			)

			return await this.services.artists.update(
				{ profile: userData, userAuth: user_auth_id as number },
				inputs.file
			)
		} catch (error) {
			return new UpdateArtistReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
