import { DatabaseServices } from "Infra-backend"
import { ModifyArtistInputDTO, ModifyArtistReplyDTO } from "Dto"
import { UsecaseLayer } from "../../assets"
import { formatters } from "Operators"
import { Artist, ModifyArtistParams } from "Domain"
import { ErrorMsg } from "Shared-utils"

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
