import { EntityID, GenreType } from "Shared"

export class IDUsecaseParams {
	id: EntityID

	constructor(id: EntityID) {
		this.id = id
	}
}

export class GenreUsecaseParams {
	genre: GenreType

	constructor(genre: GenreType) {
		this.genre = genre
	}
}
