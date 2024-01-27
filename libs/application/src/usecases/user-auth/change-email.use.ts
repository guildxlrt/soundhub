import { ChangeEmailReplyDTO, envs, htmlError } from "Shared"
import { ChangeEmailUsecaseParams } from "../../assets"
import { ErrorMsg, validators } from "Shared"
import { AuthServices, UserAuthService } from "../../services"

export class ChangeEmailUsecase {
	private userAuthService: UserAuthService
	private authService?: AuthServices

	constructor(userAuthService: UserAuthService, authService?: AuthServices) {
		this.userAuthService = userAuthService
		this.authService = authService
	}

	async execute(input: ChangeEmailUsecaseParams): Promise<ChangeEmailReplyDTO> {
		try {
			const { actual, confirm, newEmail, id } = input

			// Operators
			validators.changeEmail(
				{
					actual: actual,
					newEmail: newEmail,
					confirm: confirm,
				},
				envs.backend
			)

			if (this.authService) {
				const data = await this.authService.getByID(id as number)

				const compareIDs = await this.authService.compareIDs(data.id, id as number)
				const compareEmails = await this.authService.compareEmails(data.email, newEmail)

				if (!compareIDs || !compareEmails) throw ErrorMsg.htmlError(htmlError[403])

				return await this.userAuthService.changePass({
					id: id as number,
					pass: newEmail,
				})
			} else
				return await this.userAuthService.changeEmail({
					actual: actual,
					newEmail: newEmail,
					confirm: confirm,
				})
		} catch (error) {
			return new ChangeEmailReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}
}
