import { CreateArtistReplyDTO, genresFormatter } from "Shared"
import { UsecaseLayer, ServicesType } from "../../../assets"
import { NewArtistAdapter } from "Shared"
import { ErrorMsg, validators } from "Shared"
import { Artist, UserAuth } from "../../entities"

export class CreateArtistUsecase extends UsecaseLayer {
	constructor(services: ServicesType) {
		super(services)
	}

	async execute(inputs: NewArtistAdapter): Promise<CreateArtistReplyDTO> {
		try {
			const { email, password } = inputs.auth
			const { confirmEmail, confirmPass } = inputs.authConfirm
			const { name, bio, members, genres } = inputs.profile
			const hashedPass = inputs.hashedPass

			// SANITIZE
			// auths
			validators.signupAuths(email, password, confirmEmail, confirmPass)
			// genres
			const cleanGenres = genresFormatter.format(genres)
			// others data checking
			// ... ( name)

			const userData = new Artist(null, null, name, bio, members, cleanGenres, null)
			const userAuths = new UserAuth(null, email, password)

			return await this.services.artists.create(
				{
					profile: userData,
					userAuth: userAuths,
					authConfirm: undefined,
					hashedPass: hashedPass,
				},
				inputs.file
			)
		} catch (error) {
			return new CreateArtistReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
