export class LoginParams {
	email: string
	password: string

	constructor(email: string, password: string) {
		this.email = email
		this.password = password
	}
}

export class ChangeEmailParams {
	actual: string
	confirm: string
	newEmail: string

	constructor(actual: string, confirm: string, newEmail: string) {
		this.actual = actual
		this.confirm = confirm
		this.newEmail = newEmail
	}
}

export class ChangePassParams {
	actual: string
	confirm: string
	newPass: string

	constructor(actual: string, confirm: string, newPass: string) {
		this.actual = actual
		this.confirm = confirm
		this.newPass = newPass
	}
}
