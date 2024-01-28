import { ErrorMsg, ILoginSucc, ReplyLayer, htmlError } from "Shared"
import { LoginUsecaseParams } from "../../assets"
import { ArtistsService, AuthService, UserAuthService } from "../../services"

export class LoginUsecase {
	private userAuthService: UserAuthService
	private authService?: AuthService
	private profileService?: ArtistsService

	constructor(userAuthService: UserAuthService, authService?: AuthService, profileService?: any) {
		this.userAuthService = userAuthService
		this.authService = authService
		this.profileService = profileService
	}

	async execute(input: LoginUsecaseParams): Promise<ReplyLayer<ILoginSucc>> {
		try {
			if (this.authService && this.profileService)
				return await this.backend(this.authService, this.profileService, input)
			else if (!this.authService && !this.profileService) return await this.frontend(input)
			else throw new Error()
		} catch (error) {
			return new ReplyLayer<ILoginSucc>(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}

	async backend(
		authService: AuthService,
		profileService: ArtistsService,
		input: LoginUsecaseParams
	) {
		try {
			const { email, password } = input

			// VERIFY CREDS
			const data = await authService.getByEmail(email)
			const comparePass = await authService.comparePass(data.password, password)
			const compareEmails = await authService.compareEmails(data.email, email)

			if (!compareEmails || !comparePass) throw ErrorMsg.htmlError(htmlError[403])

			// GET THE PROFILE
			const userData = await profileService.getByAuth(data.id)

			// Cookie
			const userCookie = await authService.genCookie(
				data.id,
				userData.profile.id as number,
				"artist"
			)

			return await this.userAuthService.login(userCookie)
		} catch (error) {
			return new ReplyLayer<ILoginSucc>(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}

	async frontend(input: LoginUsecaseParams) {
		try {
			const { email, password } = input

			return await this.userAuthService.login({ email: email, password: password })
		} catch (error) {
			return new ReplyLayer<ILoginSucc>(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
