import { ArtistID, FileType, IRelease, ReleaseID } from "Shared"

export class NewReleaseUsecaseParams {
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

export class EditReleaseUsecaseParams {
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

export class HideReleaseUsecaseParams {
	id: ReleaseID
	isPublic: boolean
	ownerID?: ArtistID

	constructor(id: ReleaseID, isPublic: boolean, ownerID?: ArtistID) {
		this.id = id
		this.isPublic = isPublic
		this.ownerID = ownerID
	}
}
