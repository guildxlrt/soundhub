import { CreateArtistReplyDTO } from "Shared"
import { UsecaseLayer, ServicesType, NewArtistUsecaseParams } from "../../../assets"
import { ErrorMsg } from "Shared"
import { Artist, UserAuth } from "../../entities"

export class CreateArtistUsecase extends UsecaseLayer {
	constructor(services: ServicesType, backend: boolean) {
		super(services, backend)
	}

	async execute(inputs: NewArtistUsecaseParams): Promise<CreateArtistReplyDTO> {
		try {
			const { email, password } = inputs.auth
			const { name, bio, members, genres } = inputs.profile

			const userData = new Artist(null, null, name, bio, members, genres, null)
			const userAuths = new UserAuth(null, email, password)

			return await this.services.artists.create(
				{
					profile: userData,
					userAuth: userAuths,
					authConfirm: undefined,
				},
				inputs.file
			)
		} catch (error) {
			return new CreateArtistReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
