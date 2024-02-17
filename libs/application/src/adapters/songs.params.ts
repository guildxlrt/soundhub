import { Song, StreamFile } from "Domain"
import { ArtistProfileID, EditSongDTO, PostSongDTO, SongID } from "Shared"

export class AddSongUsecaseParams {
	data: Song
	audio: StreamFile
	authID: number
	artistsIDs?: ArtistProfileID[]

	constructor(data: Song, authID: number, audio: StreamFile, artistsIDs?: ArtistProfileID[]) {
		this.data = data
		this.audio = audio
		this.authID = authID
		this.artistsIDs = artistsIDs
	}

	static fromBackend(dto: PostSongDTO, authID: number, audio: StreamFile | unknown) {
		const { feats, title, lyrics } = dto
		const song = new Song(null, null, null, title, lyrics, true)

		return new AddSongUsecaseParams(song, authID, audio as StreamFile, feats)
	}
}

export class EditSongUsecaseParams {
	data: Song
	audio: StreamFile | null
	authID: number
	artistsIDs: number[] | null

	constructor(
		data: Song,
		authID: number,
		audio: StreamFile | null,
		artistsIDs: number[] | null
	) {
		this.data = data
		this.audio = audio
		this.authID = authID
		this.artistsIDs = artistsIDs
	}

	static fromBackend(dto: EditSongDTO, authID: number, audio?: StreamFile | unknown) {
		const { title, feats, lyrics, id, recordID } = dto

		const song = new Song(id, recordID, null, title, lyrics, true)

		return new EditSongUsecaseParams(
			song,
			authID,
			audio ? (audio as StreamFile) : null,
			feats ? feats : null
		)
	}
}

export class DeleteSongUsecaseParams {
	id: SongID
	authID?: ArtistProfileID

	constructor(id: SongID, authID?: ArtistProfileID) {
		this.id = id
		this.authID = authID
	}

	static fromBackend(id: number | string, authID: ArtistProfileID) {
		const recordID = typeof id === "string" ? Number(id) : id
		return new DeleteSongUsecaseParams(recordID, authID)
	}
}

export class SongFeatUsecaseParams {
	song: number
	artists: number[]
	authID?: number

	constructor(song: number, artists: number[], authID?: number) {
		this.artists = artists
		this.song = song
		this.authID = authID
	}
}
