import {
	EditReleaseDTO,
	GenresArray,
	PostReleaseDTO,
	ArtistProfileID,
	ReleaseID,
	ReleaseType,
} from "Shared"
import { StreamFile, Release, Song } from "Domain"

export class NewReleaseUsecaseParams {
	release: {
		data: Release
		cover?: StreamFile
	}
	songs: {
		data: Song
		audio: StreamFile
	}[]

	constructor(
		release: {
			data: Release
			cover?: StreamFile
		},
		songs: {
			data: Song
			audio: StreamFile
		}[]
	) {
		this.release = release
		this.songs = songs
	}

	static fromDto(
		dto: PostReleaseDTO,
		user: number,
		audio: StreamFile[] | unknown[],
		cover?: StreamFile | unknown
	) {
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
				data: new Song(null, null, null, song.title, song.feats, song.lyrics),
				audio: audio[index] as StreamFile,
			}
		})
		return new NewReleaseUsecaseParams(
			{
				data: releaseData,
				cover: cover as StreamFile,
			},
			songs
		)
	}
}

export class EditReleaseUsecaseParams {
	release: {
		data: Release
		cover?: StreamFile
	}
	songs: Song[]
	delCover?: boolean

	constructor(
		release: {
			data: Release
			cover?: StreamFile
		},
		songs: Song[],
		delCover?: boolean
	) {
		this.release = release
		this.songs = songs
		this.delCover = delCover
	}

	static fromDto(dto: EditReleaseDTO, user: number, cover?: StreamFile | unknown) {
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
			return new Song(song.id, id, null, song.title, song.feats, song.lyrics)
		})

		return new EditReleaseUsecaseParams(
			{
				data: releaseData,
				cover: cover as StreamFile,
			},
			songs,
			delCover
		)
	}
}

export class SetPublicStatusReleaseUsecaseParams {
	id: ReleaseID
	ownerID?: ArtistProfileID

	constructor(id: ReleaseID, ownerID?: ArtistProfileID) {
		this.id = id
		this.ownerID = ownerID
	}

	static fromDtoBackend(id: ReleaseID, ownerID: ArtistProfileID) {
		return new SetPublicStatusReleaseUsecaseParams(id, ownerID)
	}
}
