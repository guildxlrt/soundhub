import { ChangeEmailDTO, ChangePassDTO, LoginDTO, UserAuthID } from "Shared"

export class LoginParamsAdapter {
	email: string
	password: string

	constructor(email: string, password: string) {
		this.email = email
		this.password = password
	}

	static fromDto(dto: LoginDTO) {
		const { email, password } = dto
		return new LoginParamsAdapter(email, password)
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

	static fromDto(dto: ChangeEmailDTO, user: number) {
		const { actual, confirm, newEmail } = dto
		return new ChangeEmailParamsAdapter(actual, confirm, newEmail, user)
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

	static fromDto(dto: ChangePassDTO, user: number) {
		const { actual, confirm, newPass } = dto
		return new ChangePassParamsAdapter(actual, confirm, newPass, user)
	}
}
