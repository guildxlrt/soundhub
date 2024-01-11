import { UserAuthId } from "Shared"

export class LoginParams {
	email: string
	password: string
	encrypted?: string
	id?: string

	constructor(email: string, password: string, encrypted?: string, id?: string) {
		this.email = email
		this.password = password
		this.encrypted = encrypted
		this.id = id
	}
}

export class ChangeEmailParams {
	actual: string
	confirm: string
	newEmail: string
	id: UserAuthId

	constructor(actual: string, confirm: string, newEmail: string, id: UserAuthId) {
		this.actual = actual
		this.confirm = confirm
		this.newEmail = newEmail
		this.id = id
	}
}

export class ChangePassParams {
	actual: string
	confirm: string
	newPass: string
	id: UserAuthId
	hashedPass?: string

	constructor(
		actual: string,
		confirm: string,
		newPass: string,
		id: UserAuthId,
		hashedPass?: string
	) {
		this.actual = actual
		this.confirm = confirm
		this.newPass = newPass
		this.hashedPass = hashedPass
		this.id = id
	}
}
