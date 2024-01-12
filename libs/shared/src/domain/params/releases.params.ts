import { GenresArray, ReleaseId, ReleasePrice, UserAuthId } from "../../utils"
import { Release } from "../entities"

export class NewReleaseParams {
	release: Omit<Release, "id" | "coverUrl">
	songs: {
		// audio: File
		title: string
		featuring: number[]
		lyrics: string | null
	}[]
	cleanGenres?: GenresArray

	constructor(
		release: Omit<Release, "id" | "coverUrl">,
		songs: {
			// audio: File
			title: string
			featuring: number[]
			lyrics: string | null
		}[],
		cleanGenres?: GenresArray
	) {
		this.release = release
		this.songs = songs
		this.cleanGenres = cleanGenres
	}
}

export class ModifyReleaseParams {
	id: ReleaseId
	price: ReleasePrice
	userAuth?: UserAuthId

	constructor(id: ReleaseId, price: ReleasePrice, userAuth?: UserAuthId) {
		this.id = id
		this.price = price
		this.userAuth = userAuth
	}
}

export class HideReleaseParams {
	id: ReleaseId
	isPublic: boolean
	userAuth?: UserAuthId

	constructor(id: ReleaseId, isPublic: boolean, userAuth?: UserAuthId) {
		this.id = id
		this.isPublic = isPublic
		this.userAuth = userAuth
	}
}
