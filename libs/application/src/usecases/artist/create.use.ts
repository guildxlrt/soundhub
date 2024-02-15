import { ErrorMsg, INewArtistBackSucces, UserToken, envs, filePath } from "Shared"
import { UsecaseReply } from "../../utils"
import { Artist, PasswordServicePort, UserAuth, ValidationServicePort } from "Domain"
import { ArtistsService, StorageService } from "../../services"
import { NewArtistUsecaseParams } from "../../adapters"

export class CreateArtistUsecase {
	private mainService: ArtistsService
	private storageService?: StorageService
	private passwordService?: PasswordServicePort
	private validationService?: ValidationServicePort

	constructor(
		mainService: ArtistsService,
		storageService?: StorageService,
		passwordService?: PasswordServicePort,
		validationService?: ValidationServicePort
	) {
		this.mainService = mainService
		this.storageService = storageService
		this.passwordService = passwordService
		this.validationService = validationService
	}

	async execute(input: NewArtistUsecaseParams): Promise<UsecaseReply<boolean | UserToken>> {
		try {
			const { file, profile } = input
			// validate
			profile.sanitize()
			file?.validateImage()

			if (
				envs.backend &&
				this.storageService &&
				this.passwordService &&
				this.validationService
			)
				return await this.backend(
					input,
					this.storageService,
					this.passwordService,
					this.validationService
				)
			else if (
				envs.backend &&
				(!this.storageService || !this.passwordService || !this.validationService)
			)
				throw new ErrorMsg("services error")
			else return await this.frontend(input)
		} catch (error) {
			return new UsecaseReply<UserToken>(null, error as ErrorMsg)
		}
	}

	async backend(
		input: NewArtistUsecaseParams,
		storageService: StorageService,
		passwordService: PasswordServicePort,
		validationService: ValidationServicePort
	): Promise<UsecaseReply<UserToken>> {
		try {
			const { file, profile, auth, authConfirm } = input

			// validate
			await auth
				.validateNewAuths(
					validationService,
					authConfirm?.confirmEmail,
					authConfirm?.confirmPass
				)
				.then(async () => {
					await auth.hashPass(passwordService)
				})

			// Persist
			const artist: INewArtistBackSucces = (await this.mainService.create({
				profile: profile,
				userAuth: auth,
			})) as INewArtistBackSucces
			if (!artist) throw new ErrorMsg("Error during persisting")

			// storing file
			if (file) {
				// move new
				const newImagePath = await file.move(storageService, filePath.store.artist)

				// persist
				await this.mainService.setLogoPath(newImagePath, artist.id as number)
			}

			// Cookie
			const userToken = new UserToken(artist.id as number, artist.authID, "artist")
			if (!userToken) throw new ErrorMsg("Error to get cookie")

			return new UsecaseReply<UserToken>(userToken, null)
		} catch (error) {
			return new UsecaseReply<UserToken>(null, error as ErrorMsg)
		}
	}

	async frontend(input: NewArtistUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { file, profile, auth, authConfirm } = input
			const { website, country, name, bio, members, genres } = profile
			const { email, password } = auth

			const profileData = new Artist(
				null,
				null,
				null,
				name,
				bio,
				members,
				genres,
				website,
				country,
				null
			)
			const authData = new UserAuth(null, email, password)

			// PERSIST
			const newUserAuth = (await this.mainService.create(
				{
					profile: profileData,
					userAuth: authData,
					authConfirm: authConfirm,
				},
				file
			)) as boolean

			return new UsecaseReply<boolean>(newUserAuth, null)
		} catch (error) {
			return new UsecaseReply<boolean>(null, error as ErrorMsg)
		}
	}
}
