import { GenreType } from "libs/shared/src/utils"

export class IdParams {
	id: number

	constructor(id: number) {
		this.id = id
	}
}

export class EmailParams {
	email: string

	constructor(email: string) {
		this.email = email
	}
}

export class GenreParams {
	genre: GenreType

	constructor(genre: GenreType) {
		this.genre = genre
	}
}

export class DateParams {
	date: Date

	constructor(date: Date) {
		this.date = date
	}
}

export class PlaceParams {
	place: string

	constructor(place: string) {
		this.place = place
	}
}
