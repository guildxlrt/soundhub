import { UserAuthID } from "Shared"

export class LoginUsecaseParams {
	email: string
	password: string
	encrypted?: string

	constructor(email: string, password: string, encrypted?: string) {
		this.email = email
		this.password = password
		this.encrypted = encrypted
	}
}

export class ChangeEmailUsecaseParams {
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

export class ChangePassUsecaseParams {
	actual: string
	confirm: string
	newPass: string
	id?: UserAuthID
	hashedPass?: string

	constructor(
		actual: string,
		confirm: string,
		newPass: string,
		id?: UserAuthID,
		hashedPass?: string
	) {
		this.actual = actual
		this.confirm = confirm
		this.newPass = newPass
		this.hashedPass = hashedPass
		this.id = id
	}
}
