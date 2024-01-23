import { ArtistID, FileType, IRelease, ReleaseID } from "../utils"

export class NewReleaseAdapter {
	release: {
		data: Omit<IRelease, "id" | "coverUrl">
		cover: FileType
	}
	songs: {
		data: { title: string; featuring: number[]; lyrics: string | null }
		audioFile: FileType
	}[]

	constructor(
		release: {
			data: Omit<IRelease, "id" | "coverUrl">
			cover: FileType
		},
		songs: {
			data: { title: string; featuring: number[]; lyrics: string | null }
			audioFile: FileType
		}[]
	) {
		this.release = release
		this.songs = songs
	}
}

export class ModifyReleaseAdapter {
	release: {
		data: Omit<IRelease, "id" | "coverUrl">
		cover: FileType
	}
	songs: {
		title: string
		featuring: ArtistID[]
		lyrics: string | null
	}[]

	constructor(
		release: {
			data: Omit<IRelease, "id" | "coverUrl">
			cover: FileType
		},
		songs: {
			title: string
			featuring: ArtistID[]
			lyrics: string | null
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
