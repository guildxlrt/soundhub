import { ReleaseId, ReleasePrice } from "Shared-utils"
import { Release, Song } from "../../../entities"

export class NewReleaseParams {
	release: Release
	songs: Song[]

	constructor(release: Release, songs: Song[]) {
		this.release = release
		this.songs = songs
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
