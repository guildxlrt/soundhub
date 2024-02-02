import { ErrorHandler, ErrorMsg, ILoginSuccess, UserToken, envs, htmlError } from "Shared"
import { ArtistsService, UserAuthService } from "../../services"
import { PasswordServicePort } from "Domain"
import { LoginUsecaseParams, UsecaseReply } from "../../utils"

export class LoginUsecase {
	private mainService: UserAuthService
	private profileService?: ArtistsService
	private passwordService?: PasswordServicePort

	constructor(
		mainService: UserAuthService,
		passwordService?: PasswordServicePort,
		profileService?: ArtistsService
	) {
		this.mainService = mainService
		this.passwordService = passwordService
		this.profileService = profileService
	}

	async execute(input: LoginUsecaseParams): Promise<UsecaseReply<ILoginSuccess>> {
		try {
			if (envs.backend && this.profileService && this.passwordService)
				return await this.backend(input, this.passwordService, this.profileService)
			else if (envs.backend && (!this.profileService || !this.passwordService))
				throw new ErrorMsg("services error")
			else return await this.frontend(input)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async frontend(input: LoginUsecaseParams): Promise<UsecaseReply<boolean>> {
		try {
			const { email, password } = input
			const login = (await this.mainService.login(email, password)) as boolean
			return new UsecaseReply<boolean>(login)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async backend(
		input: LoginUsecaseParams,
		passwordService: PasswordServicePort,
		profileService: ArtistsService
	): Promise<UsecaseReply<UserToken>> {
		try {
			const { email, password } = input

			// VERIFY CREDS
			const authDb = await this.mainService.getByEmail(email)
			const emailMustBeSimilar = email === authDb.email
			const passMustBeSimilar = await passwordService.areSimilar(password, authDb.password)

			if (!emailMustBeSimilar || !passMustBeSimilar) throw ErrorMsg.htmlError(htmlError[403])

			// GET THE PROFILE
			const userData = await profileService.findByAuthID(authDb.id)
			if (!userData) throw new ErrorMsg("internal server errror")

			// Cookie
			const userToken = new UserToken(authDb.id, userData.profile.id as number, "artist")
			if (!userToken) throw new ErrorMsg("internal server errror")

			return new UsecaseReply<UserToken>(userToken)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
