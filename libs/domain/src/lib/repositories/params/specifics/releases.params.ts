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
	data: {
		id: ReleaseId
		price: ReleasePrice
	}

	constructor(data: { id: ReleaseId; price: ReleasePrice }) {
		this.data = data
	}
}
