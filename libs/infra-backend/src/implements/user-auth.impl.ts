import { ChangeEmailParams, ChangePassParams, LoginParams, UserAuthsRepository } from "Domain"
import { ReplyDTO } from "Dto"
import { LoginReplyDTO, LogoutReplyDTO, ChangeEmailReplyDTO, ChangePassReplyDTO } from "Dto"

export class UserAuthsImplement implements UserAuthsRepository {
	async login(inputs: LoginParams): Promise<LoginReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new ReplyDTO({})

		return res
	}

	async logout(): Promise<LogoutReplyDTO> {
		// Calling DB
		// ... some logic

		// Return Response
		const res: any = new ReplyDTO({})

		return res
	}

	async changeEmail(inputs: ChangeEmailParams): Promise<ChangeEmailReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new ReplyDTO({})

		return res
	}

	async changePass(inputs: ChangePassParams): Promise<ChangePassReplyDTO> {
		// Calling DB
		// ... some logic
		console.log(inputs)

		// Return Response
		const res: any = new ReplyDTO({})

		return res
	}
}
