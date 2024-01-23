import { ModifyArtistReplyDTO, formatters } from "Shared"
import { UsecaseLayer, ServicesType } from "../../../assets"
import { ModifyArtistAdapter } from "Shared"
import { ErrorMsg } from "Shared"
import { Artist } from "../../entities"

export class ModifyArtistUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: ModifyArtistAdapter): Promise<ModifyArtistReplyDTO> {
		try {
			const { genres, name, bio, members, user_auth_id } = inputs.profile

			// SANITIZE
			// genres
			const cleanGenres = formatters.genres(genres)
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

			return await this.services.artists.modify(
				{ profile: userData, userAuth: user_auth_id as number },
				inputs.file
			)
		} catch (error) {
			return new ModifyArtistReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
