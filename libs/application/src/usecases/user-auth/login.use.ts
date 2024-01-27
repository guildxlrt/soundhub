import { ErrorMsg, ILoginSucc, ReplyLayer, htmlError } from "Shared"
import { LoginUsecaseParams } from "../../assets"
import { AuthServices, UserAuthService } from "../../services"

export class LoginUsecase {
	private userAuthService: UserAuthService
	private authService?: AuthServices

	constructor(userAuthService: UserAuthService, authService?: AuthServices) {
		this.userAuthService = userAuthService
		this.authService = authService
	}

	async execute(input: LoginUsecaseParams): Promise<ReplyLayer<ILoginSucc>> {
		try {
			const { email, password } = input

			if (this.authService) {
				const data = await this.authService.getByEmail(email)

				const comparePass = await this.authService.comparePass(data.email, data.password)
				const compareEmails = await this.authService.compareEmails(
					data.email,
					data.password
				)

				if (!compareEmails || !comparePass) throw ErrorMsg.htmlError(htmlError[403])

				// GET THE PROFILE
				// ... logic

				return await this.userAuthService.login({ id: data.id, profile: 0 })
			} else return await this.userAuthService.login({ email: email, password: password })
		} catch (error) {
			return new ReplyLayer<ILoginSucc>(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
