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
	readonly newOne: string
	readonly confirm: string

	constructor(actual: string, newOne: string, confirm: string) {
		this.actual = actual
		this.confirm = confirm
		this.newOne = newOne
	}
}

export class ChangeEmailDTO {
	readonly actual: string
	readonly newOne: string
	readonly confirm: string

	constructor(actual: string, newOne: string, confirm: string) {
		this.actual = actual
		this.confirm = confirm
		this.newOne = newOne
	}
}
