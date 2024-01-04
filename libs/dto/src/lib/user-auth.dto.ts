import { ReplyDTO } from "../assets"

// LOGIN
export interface LoginInputDTO {
	readonly email: string
	readonly password: string
}
export class LoginReplyDTO extends ReplyDTO<Credential> {}

// LOGOUT
export class LogoutReplyDTO extends ReplyDTO<void> {}

// EMAIL
export interface ChangeEmailInputDTO {
	readonly actual: string
	readonly newEmail: string
	readonly confirm: string
}
export class ChangeEmailReplyDTO extends ReplyDTO<boolean> {}

// PASSWORD
export interface ChangePassInputDTO {
	readonly actual: string
	readonly newPass: string
	readonly confirm: string
}
export class ChangePassReplyDTO extends ReplyDTO<boolean> {}
