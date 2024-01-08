import { UserEmail, UserPassword } from "../utils"
import { ReplyDTO } from "./layers/reply"

// LOGIN
export interface LoginReqDTO {
	readonly email: UserEmail
	readonly password: UserPassword
}
export class LoginReplyDTO extends ReplyDTO<Credential> {}

// LOGOUT
export class LogoutReplyDTO extends ReplyDTO<void> {}

// EMAIL
export interface ChangeEmailReqDTO {
	readonly actual: UserEmail
	readonly newEmail: UserEmail
	readonly confirm: UserEmail
}
export class ChangeEmailReplyDTO extends ReplyDTO<boolean> {}

// PASSWORD
export interface ChangePassReqDTO {
	readonly actual: UserPassword
	readonly newPass: UserPassword
	readonly confirm: UserPassword
}
export class ChangePassReplyDTO extends ReplyDTO<boolean> {}
