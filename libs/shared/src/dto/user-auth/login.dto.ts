export class LoginDTO {
	readonly email: string
	readonly password: string

	constructor(email: string, password: string) {
		this.email = email
		this.password = password
	}
}

export class ChangePassDTO {
	readonly actual: string
	readonly newPass: string
	readonly confirm: string

	constructor(actual: string, newPass: string, confirm: string) {
		this.actual = actual
		this.confirm = confirm
		this.newPass = newPass
	}
}

export class ChangeEmailDTO {
	readonly actual: string
	readonly newEmail: string
	readonly confirm: string

	constructor(actual: string, newEmail: string, confirm: string) {
		this.actual = actual
		this.confirm = confirm
		this.newEmail = newEmail
	}
}
