import { ChangeEmailReplyDTO, htmlError } from "Shared"
import { ChangeEmailUsecaseParams } from "../../assets"
import { ErrorMsg } from "Shared"
import { AuthService, UserAuthService } from "../../services"

export class ChangeEmailUsecase {
	private userAuthService: UserAuthService
	private authService?: AuthService

	constructor(userAuthService: UserAuthService, authService?: AuthService) {
		this.userAuthService = userAuthService
		this.authService = authService
	}

	async execute(input: ChangeEmailUsecaseParams): Promise<ChangeEmailReplyDTO> {
		try {
			if (this.authService) return await this.backend(this.authService, input)
			else return await this.frontend(input)
		} catch (error) {
			return new ChangeEmailReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}

	async frontend(input: ChangeEmailUsecaseParams) {
		try {
			const { actual, confirm, newEmail } = input

			return await this.userAuthService.changeEmail({
				actual: actual,
				newEmail: newEmail,
				confirm: confirm,
			})
		} catch (error) {
			return new ChangeEmailReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
		}
	}

	async backend(authService: AuthService, input: ChangeEmailUsecaseParams) {
		const { newEmail, id } = input

		// AUTHENTIFICATE
		const data = await authService.getByID(id as number)
		const compareIDs = await authService.compareIDs(data.id, id as number)
		const compareEmails = await authService.compareEmails(data.email, newEmail)

		if (!compareIDs || !compareEmails) throw ErrorMsg.htmlError(htmlError[403])

		// SAVE
		return await this.userAuthService.changePass({
			id: id as number,
			pass: newEmail,
		})
	}

	// async executeOld(input: ChangeEmailUsecaseParams): Promise<ChangeEmailReplyDTO> {
	// 	try {
	// 		const { actual, confirm, newEmail, id } = input

	// 		// Operators
	// 		validators.changeEmail(
	// 			{
	// 				actual: actual,
	// 				newEmail: newEmail,
	// 				confirm: confirm,
	// 			},
	// 			envs.backend
	// 		)

	// 		if (this.authService) {
	// 			const data = await this.authService.getByID(id as number)

	// 			const compareIDs = await this.authService.compareIDs(data.id, id as number)
	// 			const compareEmails = await this.authService.compareEmails(data.email, newEmail)

	// 			if (!compareIDs || !compareEmails) throw ErrorMsg.htmlError(htmlError[403])

	// 			return await this.userAuthService.changePass({
	// 				id: id as number,
	// 				pass: newEmail,
	// 			})
	// 		} else
	// 			return await this.userAuthService.changeEmail({
	// 				actual: actual,
	// 				newEmail: newEmail,
	// 				confirm: confirm,
	// 			})
	// 	} catch (error) {
	// 		return new ChangeEmailReplyDTO(undefined, new ErrorMsg(`Error: failed to persist`))
	// 	}
	// }
}
