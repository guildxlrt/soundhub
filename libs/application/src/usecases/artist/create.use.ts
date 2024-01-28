import { CreateArtistReplyDTO } from "Shared"
import { NewArtistUsecaseParams } from "../../assets"
import { ErrorMsg } from "Shared"
import { Artist, UserAuth } from "Domain"
import { ArtistsService } from "../../services"

export class CreateArtistUsecase {
	artistsService: ArtistsService
	constructor(artistsService: ArtistsService) {
		this.artistsService = artistsService
	}

	async execute(input: NewArtistUsecaseParams): Promise<CreateArtistReplyDTO> {
		try {
			const { email, password } = input.auth
			const { name, bio, members, genres } = input.profile

			const userData = new Artist(null, null, name, bio, members, genres, null)
			const userAuths = new UserAuth(null, email, password)

			return await this.artistsService.create(
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
