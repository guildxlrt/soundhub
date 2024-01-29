import { ErrorHandler, ErrorMsg, LoginReplyDTO, envs, htmlError } from "Shared"
import { LoginUsecaseParams } from "../../assets"
import { ArtistsService, UserAuthService } from "../../services"

export class LoginUsecase {
	private userAuthService: UserAuthService
	private profileService?: ArtistsService

	constructor(userAuthService: UserAuthService, profileService?: any) {
		this.userAuthService = userAuthService
		this.profileService = profileService
	}

	async execute(input: LoginUsecaseParams): Promise<LoginReplyDTO> {
		try {
			if (!envs.backend) return await this.frontend(input)
			else if (envs.backend && this.profileService)
				return await this.backend(this.profileService, input)
			else throw new Error("service error")
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: LoginUsecaseParams): Promise<LoginReplyDTO> {
		try {
			const { email, password } = input

			const data = await this.userAuthService.login({ email: email, password: password })

			return new LoginReplyDTO(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(
		profileService: ArtistsService,
		input: LoginUsecaseParams
	): Promise<LoginReplyDTO> {
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

			const data = await this.userAuthService.login(userCookie)
			return new LoginReplyDTO(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
