import { ChangeEmailDTO, ChangePassDTO, LoginDTO, UserAuthID } from "Shared"

export class LoginUsecaseParams {
	email: string
	password: string

	constructor(email: string, password: string) {
		this.email = email
		this.password = password
	}

	static fromBackend(dto: LoginDTO) {
		const { email, password } = dto
		return new LoginUsecaseParams(email, password)
	}
}

export class ChangeEmailUsecaseParams {
	actual: string
	confirm: string
	newOne: string
	id?: UserAuthID

	constructor(actual: string, confirm: string, newOne: string, id?: UserAuthID) {
		this.actual = actual
		this.confirm = confirm
		this.newOne = newOne
		this.id = id
	}

	static fromBackend(dto: ChangeEmailDTO, user: number) {
		const { actual, confirm, newOne } = dto
		return new ChangeEmailUsecaseParams(actual, confirm, newOne, user)
	}
}

export class ChangePassUsecaseParams {
	actual: string
	confirm: string
	newOne: string
	id?: UserAuthID

	constructor(actual: string, confirm: string, newOne: string, id?: UserAuthID) {
		this.actual = actual
		this.confirm = confirm
		this.newOne = newOne
		this.id = id
	}

	static fromBackend(dto: ChangePassDTO, user: number) {
		const { actual, confirm, newOne } = dto
		return new ChangePassUsecaseParams(actual, confirm, newOne, user)
	}
}
