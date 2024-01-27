import { CreateArtistReplyDTO } from "Shared"
import { UsecaseLayer, RepositoriesType, NewArtistUsecaseParams } from "../../assets"
import { ErrorMsg } from "Shared"
import { Artist, UserAuth } from "Domain"

export class CreateArtistUsecase {
	constructor(services: RepositoriesType) {
		super(services)
	}

	async execute(input: NewArtistUsecaseParams): Promise<CreateArtistReplyDTO> {
		try {
			const { email, password } = input.auth
			const { name, bio, members, genres } = input.profile

			const userData = new Artist(null, null, name, bio, members, genres, null)
			const userAuths = new UserAuth(null, email, password)

			return await this.services.artists.create(
				{
					profile: userData,
					userAuth: userAuths,
					authConfirm: undefined,
				},
				input.file
			)
		} catch (error) {
			return new CreateArtistReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
