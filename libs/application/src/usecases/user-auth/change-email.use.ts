import { ChangeEmailReplyDTO, ErrorHandler, envs, htmlError } from "Shared"
import { ChangeEmailUsecaseParams } from "../../assets"
import { ErrorMsg } from "Shared"
import { UserAuthService } from "../../services"

export class ChangeEmailUsecase {
	private userAuthService: UserAuthService

	constructor(userAuthService: UserAuthService) {
		this.userAuthService = userAuthService
	}

	async execute(input: ChangeEmailUsecaseParams): Promise<ChangeEmailReplyDTO> {
		try {
			if (envs.backend) return await this.backend(input)
			else return await this.frontend(input)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async frontend(input: ChangeEmailUsecaseParams): Promise<ChangeEmailReplyDTO> {
		try {
			const { actual, confirm, newEmail } = input
			const data = await this.userAuthService.changeEmail({
				actual: actual,
				newEmail: newEmail,
				confirm: confirm,
			})
			return new ChangeEmailReplyDTO(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async backend(input: ChangeEmailUsecaseParams): Promise<ChangeEmailReplyDTO> {
		try {
			const { newEmail, id } = input

			// AUTHENTIFICATE
			const auths = await this.userAuthService.getByID(id as number)
			const compareIDs = await this.userAuthService.compareIDs(auths.id, id as number)
			const compareEmails = await this.userAuthService.compareEmails(auths.email, newEmail)

			if (!compareIDs || !compareEmails) throw ErrorMsg.htmlError(htmlError[403])

			// SAVE

			const data = await this.userAuthService.changePass({
				id: id as number,
				pass: newEmail,
			})

			return new ChangeEmailReplyDTO(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
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

	// 		if (this.userAuthService) {
	// 			const data = await this.userAuthService.getByID(id as number)

	// 			const compareIDs = await this.userAuthService.compareIDs(data.id, id as number)
	// 			const compareEmails = await this.userAuthService.compareEmails(data.email, newEmail)

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
