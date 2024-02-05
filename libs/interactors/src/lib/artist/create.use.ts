import { DatabaseServices } from "Infra-backend"
import { CreateArtistInputDTO, CreateArtistReplyDTO } from "Dto"
import { UsecaseLayer } from "../../assets"
import { Artist, NewArtistParams, UserAuth } from "Domain"
import { validators, formatters } from "Operators"
import { ErrorMsg } from "Shared-utils"

export class CreateArtistUsecase extends UsecaseLayer {
	constructor(services: DatabaseServices) {
		super(services)
	}

	async execute(inputs: {
		data: CreateArtistInputDTO
		cleanPass: string
	}): Promise<CreateArtistReplyDTO> {
		try {
			const { auths, profile } = inputs.data
			const { email, password, confirmEmail, confirmPass } = auths
			const { name, bio, members, genres } = profile

			// SANITIZE
			// auths
			validators.signupAuths(email, password, confirmEmail, confirmPass)
			// genres
			const cleanGenres = formatters.genres(genres)
			// others data checking
			// ... ( name)

			const userData = new Artist(undefined, undefined, name, bio, members, cleanGenres, null)
			const userAuths = new UserAuth(undefined, email, inputs.cleanPass)

			return await this.services.artists.create(new NewArtistParams(userData, userAuths))
		} catch (error) {
			return new CreateArtistReplyDTO(
				undefined,
				new ErrorMsg(500, `Error: failed to persist`, error)
			)
		}
	}
}
