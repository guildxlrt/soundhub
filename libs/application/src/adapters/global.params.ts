import { GenreType, RecordType, UserEmail } from "Shared"

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

export class CountryUsecaseParams {
	country: string

	constructor(country: string) {
		this.country = country
	}
}

export class EmailUsecaseParams {
	email: UserEmail

	constructor(email: string) {
		this.email = email
	}
}

export class RecordTypeUsecaseParams {
	type: RecordType | string

	constructor(type: RecordType | string) {
		this.type = type
	}
}
