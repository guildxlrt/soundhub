import { UserEmail, UserPassword } from "../types"
import { ReplyDTO } from "./layers/reply"

// LOGIN
export class LoginReqDTO {
	readonly email: UserEmail
	readonly password: UserPassword

	constructor(email: UserEmail, password: UserPassword) {
		this.email = email
		this.password = password
	}
}
export class LoginReplyDTO extends ReplyDTO<void> {}

// LOGOUT
export class LogoutReplyDTO extends ReplyDTO<void> {}

// EMAIL
export class ChangeEmailReqDTO {
	readonly actual: UserEmail
	readonly newEmail: UserEmail
	readonly confirm: UserEmail

	constructor(actual: UserEmail, newEmail: UserEmail, confirm: UserEmail) {
		this.actual = actual
		this.newEmail = newEmail
		this.confirm = confirm
	}
}
export class ChangeEmailReplyDTO extends ReplyDTO<boolean> {}

// PASSWORD
export class ChangePassReqDTO {
	readonly actual: UserPassword
	readonly newPass: UserPassword
	readonly confirm: UserPassword

	constructor(actual: UserEmail, newPass: UserEmail, confirm: UserEmail) {
		this.actual = actual
		this.newPass = newPass
		this.confirm = confirm
	}
}
export class ChangePassReplyDTO extends ReplyDTO<boolean> {}
