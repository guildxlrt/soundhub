import { DatabaseServices } from "Infra-backend"
import { ApiServices } from "Infra-frontend"
import { CreateArtistReplyDTO } from "Shared"
import { UsecaseLayer } from "../../assets"
import { Artist, NewArtistParams, UserAuth } from "Shared"
import { ErrorMsg, validators, formatters } from "Shared"

export class CreateArtistUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices | ApiServices) {
		super(services)
	}

	async execute(inputs: NewArtistParams): Promise<CreateArtistReplyDTO> {
		try {
			const { email, password } = inputs.auth
			const { confirmEmail, confirmPass } = inputs.authConfirm
			const { name, bio, members, genres } = inputs.profile
			const hashedPass = inputs.hashedPass

			// SANITIZE
			// auths
			validators.signupAuths(email, password, confirmEmail, confirmPass)
			// genres
			const cleanGenres = formatters.genres(genres)
			// others data checking
			// ... ( name)

			const userData = new Artist(undefined, undefined, name, bio, members, cleanGenres)
			const userAuths = new UserAuth(undefined, email, password)
			const authConfirm = inputs.authConfirm

			return await this.services.artists.create(
				new NewArtistParams(userData, userAuths, authConfirm, hashedPass)
			)
		} catch (error) {
			return new CreateArtistReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
