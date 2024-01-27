import { ChangePassReplyDTO, envs, htmlError } from "Shared"
import { ChangePassUsecaseParams } from "../../assets"
import { ErrorMsg, validators } from "Shared"
import { AuthServices, UserAuthService } from "../../services"

export class ChangePassUsecase {
	private userAuthService: UserAuthService
	private authService?: AuthServices

	constructor(userAuthService: UserAuthService, authService?: AuthServices) {
		this.userAuthService = userAuthService
		this.authService = authService
	}

	async execute(input: ChangePassUsecaseParams): Promise<ChangePassReplyDTO> {
		try {
			const { actual, confirm, newPass, id } = input

			// Operators
			validators.changePass(
				{
					actual: actual,
					newPass: newPass,
					confirm: confirm,
				},
				envs.backend
			)

			if (this.authService) {
				const data = await this.authService.getByID(id as number)

				const compareIDs = await this.authService.compareIDs(data.id, id as number)
				const comparePass = await this.authService.comparePass(data.email, data.password)

				if (!compareIDs || !comparePass) throw ErrorMsg.htmlError(htmlError[403])

				return await this.userAuthService.changePass({
					id: id as number,
					pass: newPass,
				})
			} else
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
