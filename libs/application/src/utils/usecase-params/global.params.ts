import { GenreType } from "Shared"

export class IDUsecaseParams {
	id: string

	constructor(id: string) {
		this.id = id
	}
}

export class GenreUsecaseParams {
	genre: GenreType

	constructor(genre: GenreType) {
		this.genre = genre
	}
}
