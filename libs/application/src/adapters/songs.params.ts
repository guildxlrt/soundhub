import { Song, StreamFile } from "Domain"
import { ArtistProfileID, EditSongDTO, PostSongDTO, SongID } from "Shared"

export class AddSongUsecaseParams {
	data: Song
	audio: StreamFile
	ownerID: number

	constructor(data: Song, ownerID: number, audio: StreamFile) {
		this.data = data
		this.audio = audio
		this.ownerID = ownerID
	}

	static fromBackend(dto: PostSongDTO, ownerID: number, audio: StreamFile | unknown) {
		const song = new Song(null, null, null, dto.title, dto.feats, dto.lyrics, true)

		return new AddSongUsecaseParams(song, ownerID, audio as StreamFile)
	}
}

export class EditSongUsecaseParams {
	data: Song
	audio: StreamFile | null
	ownerID: number

	constructor(data: Song, ownerID: number, audio: StreamFile | null) {
		this.data = data
		this.audio = audio
		this.ownerID = ownerID
	}

	static fromBackend(dto: EditSongDTO, ownerID: number, audio?: StreamFile | unknown) {
		const { title, feats, lyrics, id, releaseID } = dto

		const song = new Song(id, releaseID, null, title, feats, lyrics, true)

		return new EditSongUsecaseParams(song, ownerID, audio ? (audio as StreamFile) : null)
	}
}

export class DeleteSongUsecaseParams {
	id: SongID
	ownerID?: ArtistProfileID

	constructor(id: SongID, ownerID?: ArtistProfileID) {
		this.id = id
		this.ownerID = ownerID
	}

	static fromBackend(id: number | string, ownerID: ArtistProfileID) {
		const releaseID = typeof id === "string" ? Number(id) : id
		return new DeleteSongUsecaseParams(releaseID, ownerID)
	}
}
