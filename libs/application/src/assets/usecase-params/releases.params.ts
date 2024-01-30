import { ProfileID, ReleaseID } from "Shared"
import { File, Release, Song } from "Domain"

export class NewReleaseParamsAdapter {
	release: {
		data: Release
		cover: File
	}
	songs: {
		data: Song
		audio: File
	}[]

	constructor(
		release: {
			data: Release
			cover: File
		},
		songs: {
			data: Song
			audio: File
		}[]
	) {
		this.release = release
		this.songs = songs
	}
}

export class EditReleaseParamsAdapter {
	release: {
		data: Release
		cover?: File
	}
	songs: Song[]
	delCover?: boolean

	constructor(
		release: {
			data: Release
			cover: File
		},
		songs: Song[],
		delCover?: boolean
	) {
		this.release = release
		this.songs = songs
		this.delCover = delCover
	}
}

export class SetPrivStatusReleaseParamsAdapter {
	id: ReleaseID
	isPublic: boolean
	ownerID?: ProfileID

	constructor(id: ReleaseID, isPublic: boolean, ownerID?: ProfileID) {
		this.id = id
		this.isPublic = isPublic
		this.ownerID = ownerID
	}
}
