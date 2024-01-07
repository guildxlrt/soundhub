import { DatabaseServices } from "Infra-backend"
import { ModifyArtistInputDTO, ModifyArtistReplyDTO } from "Shared"
import { UsecaseLayer } from "../../assets"
import { Artist, ModifyArtistParams } from "Shared"
import { ErrorMsg, formatters } from "Shared"

export class ModifyArtistUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: ModifyArtistInputDTO): Promise<ModifyArtistReplyDTO> {
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
