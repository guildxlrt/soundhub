import { GenreType, ReleaseType, UserEmail } from "Shared"

export class IDUsecaseParams {
	id: number

	constructor(id: number) {
		this.id = id
	}
	static fromBackend(id: string | number) {
		const numberID = typeof id === "string" ? Number(id) : id
		return new IDUsecaseParams(numberID)
	}
}
export class DateUsecaseParams {
	date: Date | string | number

	constructor(date: Date | string | number) {
		this.date = date
	}

	static fromBackend(reqParams: string | number | Date) {
		const date = new Date(reqParams)
		return new DateUsecaseParams(date)
	}
}
export class GenreUsecaseParams {
	genre: GenreType

	constructor(genre: GenreType | string) {
		this.genre = genre as GenreType
	}
}

export class EmailUsecaseParams {
	email: UserEmail

	constructor(email: string) {
		this.email = email
	}
}

export class ReleaseTypeUsecaseParams {
	type: ReleaseType | string

	constructor(type: ReleaseType | string) {
		this.type = type
	}
}
