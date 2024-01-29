import { CreateArtistReplyDTO, envs } from "Shared"
import { NewArtistUsecaseParams } from "../../assets"
import { ErrorMsg } from "Shared"
import { Artist, UserAuth } from "Domain"
import { ArtistsService } from "../../services"

export class CreateArtistUsecase {
	private artistsService: ArtistsService

	constructor(artistsService: ArtistsService) {
		this.artistsService = artistsService
	}

	async execute(input: NewArtistUsecaseParams): Promise<CreateArtistReplyDTO> {
		try {
			if (envs.backend) return await this.backend(input)
			else return await this.frontend(input)
		} catch (error) {
			return new CreateArtistReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}

	async frontend(input: NewArtistUsecaseParams) {
		try {
			const { email, password } = input.auth
			const { name, bio, members, genres } = input.profile

			const userData = new Artist(null, null, name, bio, members, genres, null)
			const userAuths = new UserAuth(null, email, password)

			// PERSIST
			const newUserAuth = await this.artistsService.create(
				{
					profile: userData,
					userAuth: userAuths,
					authConfirm: undefined,
				},
				input.file
			)
			if (!newUserAuth?.data?.id) throw ErrorMsg.htmlError(htmlError[401])

			return newUserAuth
		} catch (error) {
			return new CreateArtistReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}

	async backend(input: NewArtistUsecaseParams) {
		try {
			const { profile, auth } = input
			return await this.artistsService.create({
				profile: profile,
				userAuth: auth,
			})
		} catch (error) {
			return new CreateArtistReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
