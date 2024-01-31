import {
	EditReleaseDTO,
	GenresArray,
	PostReleaseDTO,
	ProfileID,
	ReleaseID,
	ReleaseType,
} from "Shared"
import { File, Release, Song } from "Domain"
import { DeleteEventParamsAdapter } from "./events.params"

export class NewReleaseParamsAdapter {
	release: {
		data: Release
		cover?: File
	}
	songs: {
		data: Song
		audio: File
	}[]

	constructor(
		release: {
			data: Release
			cover?: File
		},
		songs: {
			data: Song
			audio: File
		}[]
	) {
		this.release = release
		this.songs = songs
	}

	static fromDto(dto: PostReleaseDTO, user: number, audio: File[], cover?: File) {
		const songsArray = dto.songs
		const { title, releaseType, descript, price, genres } = dto.release
		const releaseData = new Release(
			null,
			user,
			title,
			releaseType as ReleaseType,
			descript,
			price,
			genres as GenresArray,
			null
		)

		const songs = songsArray.map((song, index) => {
			return {
				data: new Song(null, null, null, song.title, song.featuring, song.lyrics),
				audio: audio[index],
			}
		})
		return new NewReleaseParamsAdapter(
			{
				data: releaseData,
				cover: cover,
			},
			songs
		)
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
			cover?: File
		},
		songs: Song[],
		delCover?: boolean
	) {
		this.release = release
		this.songs = songs
		this.delCover = delCover
	}

	static fromDto(dto: EditReleaseDTO, user: number, cover?: File) {
		const delCover = dto.delCover
		const songsArray = dto.songs
		const { title, price, descript, genres, id } = dto.release
		const releaseData = new Release(
			id,
			user,
			title,
			null,
			descript,
			price,
			genres as GenresArray,
			null
		)

		const songs = songsArray.map((song) => {
			return new Song(song.id, id, null, song.title, song.featuring, song.lyrics)
		})

		return new EditReleaseParamsAdapter(
			{
				data: releaseData,
				cover: cover,
			},
			songs,
			delCover
		)
	}
}

export class SetPrivStatusReleaseParamsAdapter {
	id: ReleaseID
	ownerID?: ProfileID

	constructor(id: ReleaseID, ownerID?: ProfileID) {
		this.id = id
		this.ownerID = ownerID
	}

	static fromDtoBackend(id: ReleaseID, ownerID: ProfileID) {
		return new DeleteEventParamsAdapter(id, ownerID)
	}
}
