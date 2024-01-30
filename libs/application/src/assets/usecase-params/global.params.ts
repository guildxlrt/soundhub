import { EntityID, GenreType } from "Shared"

export class IDParamsAdapter {
	id: EntityID

	constructor(id: EntityID) {
		this.id = id
	}
}

export class GenreParamsAdapter {
	genre: GenreType

	constructor(genre: GenreType) {
		this.genre = genre
	}
}
