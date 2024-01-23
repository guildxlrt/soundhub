import { CreateArtistReplyDTO, formatters } from "Shared"
import { UsecaseLayer, ServicesType, NewArtistUsecaseParams } from "../../../assets"
import { ErrorMsg, validators } from "Shared"
import { Artist, UserAuth } from "../../entities"

export class CreateArtistUsecase extends UsecaseLayer {
	constructor(services: ServicesType, backend: boolean) {
		super(services, backend)
	}

	async execute(inputs: NewArtistUsecaseParams): Promise<CreateArtistReplyDTO> {
		try {
			const { email, password } = inputs.auth
			const { confirmEmail, confirmPass } = inputs.authConfirm
			const { name, bio, members, genres } = inputs.profile
			const hashedPass = inputs.hashedPass

			// SANITIZE
			// auths
			validators.signupAuths(
				{
					email: email,
					password: password,
					confirmEmail: confirmEmail,
					confirmPass: confirmPass,
				},
				this.backend
			)
			// genres
			const cleanGenres = formatters.genres(genres, this.backend)
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
			return new CreateArtistReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
