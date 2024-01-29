import { ErrorHandler, ErrorMsg, filePath } from "Shared"
import { NewArtistUsecaseParams } from "../../assets"
import { Artist, StorageRepository, UserAuth, UserCookie } from "Domain"
import { ArtistsService, UserAuthService } from "../../services"

export class CreateArtistUsecase {
	private artistsService: ArtistsService
	private storageRepository?: StorageRepository
	private userAuthService?: UserAuthService

	constructor(
		artistsService: ArtistsService,
		storageRepository?: StorageRepository,
		userAuthService?: UserAuthService
	) {
		this.artistsService = artistsService
		this.storageRepository = storageRepository
		this.userAuthService = userAuthService
	}

	async execute(input: NewArtistUsecaseParams): Promise<{
		data: Artist
		userCookie?: UserCookie
	}> {
		try {
			if (this.storageRepository && this.userAuthService)
				return await this.backend(this.storageRepository, this.userAuthService, input)
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		storageRepository: StorageRepository,
		userAuthService: UserAuthService,
		input: NewArtistUsecaseParams
	): Promise<{
		data: Artist
		userCookie?: UserCookie
	}> {
		try {
			const { file } = input
			const { profile, auth } = input

			// STORING NEW FILE
			if (file) {
				// move
				const newImagePath = await storageRepository.move(file, filePath.store.announce)
				if (!newImagePath) throw new ErrorMsg(`Error: failed to store`)
				profile.updateAvatarPath(newImagePath)
			}

			// Persist
			const artist = await this.artistsService.create({
				profile: profile,
				userAuth: auth,
			})
			if (!artist) throw new ErrorMsg("Error during persisting")

			// Cookie
			const userCookie = await userAuthService.genCookie(
				artist.data.id as number,
				artist.userTokenData?.id as number,
				"artist"
			)

			return { data: artist.data, userCookie: userCookie }
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: NewArtistUsecaseParams): Promise<{
		data: Artist
		userCookie?: UserCookie
	}> {
		try {
			const { email, password } = input.auth
			const { name, bio, members, genres } = input.profile
			const { file } = input

			const userData = new Artist(null, null, name, bio, members, genres, null)
			const userAuths = new UserAuth(null, email, password)

			// PERSIST
			const newUserAuth = await this.artistsService.create(
				{
					profile: userData,
					userAuth: userAuths,
					authConfirm: input.authConfirm,
				},
				file
			)

			return {
				data: newUserAuth.data,
			}
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
