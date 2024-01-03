import { UserAuthRepository } from "Domain"
import { ChangeEmailInputDTO, ChangePassInputDTO, LoginInputDTO, ReplyDTO } from "Dto"
import { LoginReplyDTO, LogoutReplyDTO, ChangeEmailReplyDTO, ChangePassReplyDTO } from "Dto"

export class UserAuthImplement implements UserAuthRepository {
	async login(inputs: LoginInputDTO): Promise<LoginReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const creds = new Credential()
		const res = new ReplyDTO(creds)

		return res
	}

	async logout(): Promise<LogoutReplyDTO> {
		// Calling DB
		// ... some logic

		// Return Response
		const res = new ReplyDTO(undefined)

		return res
	}

	async changeEmail(inputs: ChangeEmailInputDTO): Promise<ChangeEmailReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new ReplyDTO(true)

		return res
	}

	async changePass(inputs: ChangePassInputDTO): Promise<ChangePassReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res = new ReplyDTO(true)

		return res
	}
}
