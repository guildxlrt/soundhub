import { ErrorHandler, ErrorMsg, ILoginBackSuccess, ILoginSuccess, envs, htmlError } from "Shared"
import { LoginParamsAdapter, Reply } from "../../assets"
import { ArtistsService, UserAuthService } from "../../services"

export class LoginUsecase {
	private userAuthService: UserAuthService
	private profileService?: ArtistsService

	constructor(userAuthService: UserAuthService, profileService?: any) {
		this.userAuthService = userAuthService
		this.profileService = profileService
	}

	async execute(input: LoginParamsAdapter): Promise<Reply<ILoginSuccess>> {
		try {
			if (!envs.backend) return await this.frontend(input)
			else if (envs.backend && this.profileService)
				return await this.backend(this.profileService, input)
			else throw new Error("service error")
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async frontend(input: LoginParamsAdapter): Promise<Reply<ILoginSuccess>> {
		try {
			const { email, password } = input
			const login = (await this.userAuthService.login(email, password)) as boolean
			return new Reply<boolean>(login)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}

	async backend(
		profileService: ArtistsService,
		input: LoginParamsAdapter
	): Promise<Reply<ILoginBackSuccess>> {
		try {
			const { email, password } = input

			// VERIFY CREDS
			const auths = await this.userAuthService.getByEmail(email)
			const comparePass = await this.userAuthService.comparePass(auths.password, password)
			const compareEmails = await this.userAuthService.compareEmails(auths.email, email)

			if (!compareEmails || !comparePass) throw ErrorMsg.htmlError(htmlError[403])

			// GET THE PROFILE
			const userData = await profileService.findByAuthID(auths.id)

			// Cookie
			const userCookie = await this.userAuthService.genCookie(
				auths.id,
				userData.profile.id as number,
				"artist"
			)

			if (!userData || !userCookie) throw new ErrorMsg("internal server errror")

			const res = (await this.userAuthService.login(
				userCookie,
				undefined
			)) as ILoginBackSuccess
			return new Reply<ILoginBackSuccess>(res)
		} catch (error) {
			throw new ErrorHandler().handle(error)
		}
	}
}
