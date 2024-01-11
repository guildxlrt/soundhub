import { GenresArray, ReleaseId, ReleasePrice } from "../../utils"
import { Release, Song } from "../entities"

export class NewReleaseParams {
	release: Release
	songs: Song[]
	cleanGenres: GenresArray

	constructor(release: Release, songs: Song[], cleanGenres: GenresArray) {
		this.release = release
		this.songs = songs
		this.cleanGenres = cleanGenres
	}
}

export class ModifyReleaseParams {
	id: ReleaseId
	price: ReleasePrice

	constructor(id: ReleaseId, price: ReleasePrice) {
		this.id = id
		this.price = price
	}
}

export class HideReleaseParams {
	id: ReleaseId
	isPublic: boolean

	constructor(id: ReleaseId, isPublic: boolean) {
		this.id = id
		this.isPublic = isPublic
	}
}
