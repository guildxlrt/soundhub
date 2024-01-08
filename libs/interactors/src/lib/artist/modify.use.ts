import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { ModifyArtistReqDTO, ModifyArtistReplyDTO } from "Shared"
import { UsecaseLayer } from "../../assets"
import { Artist, ModifyArtistParams } from "Shared"
import { ErrorMsg, formatters } from "Shared"

export class ModifyArtistUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(inputs: ModifyArtistReqDTO): Promise<ModifyArtistReplyDTO> {
		try {
			const { genres, name, bio, members } = inputs

			// SANITIZE
			// genres
			const cleanGenres = formatters.genres(genres)
			// others data checking
			// ... ( name)

			// Saving
			const userData = new Artist(undefined, undefined, name, bio, members, cleanGenres, null)

			return await this.services.artists.modify(new ModifyArtistParams(userData))
		} catch (error) {
			return new ModifyArtistReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
