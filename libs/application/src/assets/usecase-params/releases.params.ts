import { ArtistID, FileType, ReleaseID } from "Shared"
import { Release, Song } from "Domain"

export class NewReleaseUsecaseParams {
	release: {
		data: Release
		cover: FileType
	}
	songs: {
		data: Song
		audio: FileType
	}[]

	constructor(
		release: {
			data: Release
			cover: FileType
		},
		songs: {
			data: Song
			audio: FileType
		}[]
	) {
		this.release = release
		this.songs = songs
	}
}

export class EditReleaseUsecaseParams {
	release: {
		data: Release
		cover?: FileType
	}
	songs: Song[]

	constructor(
		release: {
			data: Release
			cover: FileType
		},
		songs: Song[]
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
