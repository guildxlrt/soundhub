import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { ModifyArtistReplyDTO } from "Shared"
import { UsecaseLayer } from "../../assets"
import { Artist, ModifyArtistParams } from "Shared"
import { ErrorMsg, formatters } from "Shared"

export class ModifyArtistUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(inputs: ModifyArtistParams): Promise<ModifyArtistReplyDTO> {
		try {
			const { genres, name, bio, members } = inputs.profile
			const { userAuth } = inputs

			// SANITIZE
			// genres
			const cleanGenres = formatters.genres(genres)
			// others data checking
			// ... ( name)

			// Saving
			const userData = new Artist(undefined, undefined, name, bio, members, cleanGenres)

			return await this.services.artists.modify(new ModifyArtistParams(userData, userAuth))
		} catch (error) {
			return new ModifyArtistReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
