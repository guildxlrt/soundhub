import { ChangePassReplyDTO, htmlError } from "Shared"
import { ChangePassUsecaseParams } from "../../assets"
import { ErrorMsg } from "Shared"
import { AuthService, UserAuthService } from "../../services"

export class ChangePassUsecase {
	private userAuthService: UserAuthService
	private authService?: AuthService

	constructor(userAuthService: UserAuthService, authService?: AuthService) {
		this.userAuthService = userAuthService
		this.authService = authService
	}

	async execute(input: ChangePassUsecaseParams): Promise<ChangePassReplyDTO> {
		try {
			if (this.authService) return await this.backend(this.authService, input)
			else return await this.frontend(input)
		} catch (error) {
			return new ChangePassReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}

	async backend(authService: AuthService, input: ChangePassUsecaseParams) {
		try {
			const { newPass, id } = input

			// AUTHENTIFICATION
			const data = await authService.getByID(id as number)
			const compareIDs = await authService.compareIDs(data.id, id as number)
			const comparePass = await authService.comparePass(data.email, data.password)

			if (!compareIDs || !comparePass) throw ErrorMsg.htmlError(htmlError[403])

			// SAVE
			const hashed = await authService.hashPass(newPass)

			return await this.userAuthService.changePass({
				id: id as number,
				pass: hashed,
			})
		} catch (error) {
			return new ChangePassReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}

	async frontend(input: ChangePassUsecaseParams) {
		try {
			const { actual, confirm, newPass } = input

			return await this.userAuthService.changePass({
				actual: actual,
				newPass: newPass,
				confirm: confirm,
			})
		} catch (error) {
			return new ChangePassReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
