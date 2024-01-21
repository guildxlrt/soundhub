import { ArtistID, GenresArray, IRelease, ReleaseID } from "../utils"

export class NewReleaseAdapter {
	release: Omit<IRelease, "id" | "coverUrl">
	songs: {
		title: string
		featuring: number[]
		lyrics: string | null
		audio: File
	}[]
	cleanGenres?: GenresArray

	constructor(
		release: Omit<IRelease, "id" | "coverUrl">,
		songs: {
			title: string
			featuring: number[]
			lyrics: string | null
			audio: File
		}[],
		cleanGenres?: GenresArray
	) {
		this.release = release
		this.songs = songs
		this.cleanGenres = cleanGenres
	}
}

export class ModifyReleaseAdapter {
	release: Omit<IRelease, "id" | "coverUrl">
	songs: {
		title: string
		featuring: ArtistID[]
		lyrics: string | null
		audio: File
	}[]

	constructor(
		release: Omit<IRelease, "id" | "coverUrl">,
		songs: {
			title: string
			featuring: ArtistID[]
			lyrics: string | null
			audio: File
		}[]
	) {
		this.release = release
		this.songs = songs
	}
}

export class HideReleaseAdapter {
	id: ReleaseID
	isPublic: boolean
	ownerID?: ArtistID

	constructor(id: ReleaseID, isPublic: boolean, ownerID?: ArtistID) {
		this.id = id
		this.isPublic = isPublic
		this.ownerID = ownerID
	}
}
