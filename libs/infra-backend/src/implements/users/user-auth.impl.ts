import { UserAuthRepository } from "Domain"
import {
	ChangeEmailInputDTO,
	ChangePassInputDTO,
	LoginInputDTO,
	LogoutInputDTO,
	ReplyDTO,
} from "Dto"
import { LoginReplyDTO, LogoutReplyDTO, ChangeEmailReplyDTO, ChangePassReplyDTO } from "Dto"

export class UserAuthImplement implements UserAuthRepository {
	async login(inputs: LoginInputDTO): Promise<LoginReplyDTO> {
		const creds = new Credential()
		const res = new ReplyDTO(creds)

		console.log(inputs)
		return res
	}

	async logout(inputs: LogoutInputDTO): Promise<LogoutReplyDTO> {
		const res = new ReplyDTO(undefined)

		console.log(inputs)
		return res
	}

	async changeEmail(inputs: ChangeEmailInputDTO): Promise<ChangeEmailReplyDTO> {
		const res = new ReplyDTO(true)

		console.log(inputs)
		return res
	}

	async changePass(inputs: ChangePassInputDTO): Promise<ChangePassReplyDTO> {
		const res = new ReplyDTO(true)

		console.log(inputs)
		return res
	}
}
