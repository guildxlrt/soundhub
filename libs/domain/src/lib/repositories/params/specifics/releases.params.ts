import { GenresArray, ReleaseId, ReleasePrice } from "Shared-utils"
import { Release, Song } from "../../../entities"

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

export class ReleasePriceParams {
	id: ReleaseId
	price: ReleasePrice

	constructor(id: ReleaseId, price: ReleasePrice) {
		this.id = id
		this.price = price
	}
}
