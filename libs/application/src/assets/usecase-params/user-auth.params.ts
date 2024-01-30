import { UserAuthID } from "Shared"

export class LoginParamsAdapter {
	email: string
	password: string

	constructor(email: string, password: string) {
		this.email = email
		this.password = password
	}
}

export class ChangeEmailParamsAdapter {
	actual: string
	confirm: string
	newEmail: string
	id?: UserAuthID

	constructor(actual: string, confirm: string, newEmail: string, id?: UserAuthID) {
		this.actual = actual
		this.confirm = confirm
		this.newEmail = newEmail
		this.id = id
	}
}

export class ChangePassParamsAdapter {
	actual: string
	confirm: string
	newPass: string
	id?: UserAuthID

	constructor(actual: string, confirm: string, newPass: string, id?: UserAuthID) {
		this.actual = actual
		this.confirm = confirm
		this.newPass = newPass
		this.id = id
	}
}
