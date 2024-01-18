import { ModifyArtistReplyDTO } from "Shared"
import { UsecaseLayer, ServicesType } from "../../../assets"
import { ModifyArtistParams } from "Shared"
import { ErrorMsg, formatters } from "Shared"
import { Artist } from "../../entities"

export class ModifyArtistUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
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
