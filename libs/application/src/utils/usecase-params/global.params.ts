import { GenreType } from "Shared"

export class IDUsecaseParams {
	id: number

	constructor(id: string) {
		this.id = Number(id)
	}
}

export class GenreUsecaseParams {
	genre: GenreType

	constructor(genre: string) {
		this.genre = genre as GenreType
	}
}

export class DateUsecaseParams {
	date: Date

	constructor(date: Date) {
		this.date = date
	}

	static fromReqParams(reqParams: string | number | Date) {
		const date = new Date(reqParams)
		return new DateUsecaseParams(date)
	}
}
