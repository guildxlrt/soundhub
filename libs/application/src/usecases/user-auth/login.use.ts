import { ErrorHandler, ErrorMsg, envs, htmlError } from "Shared"
import { LoginUsecaseParams } from "../../assets"
import { ArtistsService, UserAuthService } from "../../services"
import { UserCookie } from "Domain"

export class LoginUsecase {
	private userAuthService: UserAuthService
	private profileService?: ArtistsService

	constructor(userAuthService: UserAuthService, profileService?: any) {
		this.userAuthService = userAuthService
		this.profileService = profileService
	}

	async execute(input: LoginUsecaseParams): Promise<unknown> {
		try {
			if (!envs.backend) return await this.frontend(input)
			else if (envs.backend && this.profileService)
				return await this.backend(this.profileService, input)
			else throw new Error("service error")
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: LoginUsecaseParams): Promise<void> {
		try {
			const { email, password } = input
			return await this.userAuthService.login(email, password)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(profileService: ArtistsService, input: LoginUsecaseParams): Promise<UserCookie> {
		try {
			const { email, password } = input

			// VERIFY CREDS
			const auths = await this.userAuthService.getByEmail(email)
			const comparePass = await this.userAuthService.comparePass(auths.password, password)
			const compareEmails = await this.userAuthService.compareEmails(auths.email, email)

			if (!compareEmails || !comparePass) throw ErrorMsg.htmlError(htmlError[403])

			// GET THE PROFILE
			const userData = await profileService.getByAuth(auths.id)

			// Cookie
			const userCookie = await this.userAuthService.genCookie(
				auths.id,
				userData.profile.id as number,
				"artist"
			)

			if (!userData || !userCookie) throw new ErrorMsg("internal server errror")

			await this.userAuthService.login(undefined, undefined)
			return userCookie
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
