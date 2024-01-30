import { ErrorHandler, ErrorMsg, INewArtistBackSucces, filePath } from "Shared"
import { NewArtistParamsAdapter, Reply } from "../../assets"
import { Artist, UserAuth, UserCookie } from "Domain"
import { ArtistsService, StorageService, UserAuthService } from "../../services"

export class CreateArtistUsecase {
	private artistsService: ArtistsService
	private storageService?: StorageService
	private userAuthService?: UserAuthService

	constructor(
		artistsService: ArtistsService,
		storageService?: StorageService,
		userAuthService?: UserAuthService
	) {
		this.artistsService = artistsService
		this.storageService = storageService
		this.userAuthService = userAuthService
	}

	async execute(input: NewArtistParamsAdapter): Promise<Reply<boolean | UserCookie>> {
		try {
			if (this.storageService && this.userAuthService)
				return await this.backend(this.storageService, this.userAuthService, input)
			else return await this.frontend(input)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async backend(
		storageService: StorageService,
		userAuthService: UserAuthService,
		input: NewArtistParamsAdapter
	): Promise<Reply<UserCookie>> {
		try {
			const { file } = input
			const { profile, auth } = input

			// Persist
			const artist: INewArtistBackSucces = (await this.artistsService.create({
				profile: profile,
				userAuth: auth,
			})) as INewArtistBackSucces
			if (!artist) throw new ErrorMsg("Error during persisting")

			// storing file
			if (file) {
				// move new
				const newImagePath = await file.move(storageService, filePath.store.artist)

				// persist
				await this.artistsService.setAvatarPath(newImagePath, artist.id as number)
			}

			// Cookie
			const userCookie = await userAuthService.genCookie(
				artist.id as number,
				artist.authID,
				"artist"
			)
			if (!userCookie) throw new ErrorMsg("Error to get cookie")

			return new Reply<UserCookie>(userCookie)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async frontend(input: NewArtistParamsAdapter): Promise<Reply<boolean>> {
		try {
			const { email, password } = input.auth
			const { name, bio, members, genres } = input.profile
			const { file } = input

			const userData = new Artist(null, null, name, bio, members, genres, null)
			const userAuths = new UserAuth(null, email, password)

			// PERSIST
			const newUserAuth = (await this.artistsService.create(
				{
					profile: userData,
					userAuth: userAuths,
					authConfirm: input.authConfirm,
				},
				file
			)) as boolean

			return new Reply<boolean>(newUserAuth)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
