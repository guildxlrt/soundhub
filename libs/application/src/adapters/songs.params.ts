import { Song, StreamFile } from "Domain"
import { ArtistProfileID, EditSongDTO, PostSongDTO, SongID } from "Shared"

export class AddSongUsecaseParams {
	data: Song
	audio: StreamFile
	ownerID: number
	artistsIDs?: ArtistProfileID[]

	constructor(data: Song, ownerID: number, audio: StreamFile, artistsIDs?: ArtistProfileID[]) {
		this.data = data
		this.audio = audio
		this.ownerID = ownerID
		this.artistsIDs = artistsIDs
	}

	static fromBackend(dto: PostSongDTO, ownerID: number, audio: StreamFile | unknown) {
		const { feats, title, lyrics } = dto
		const song = new Song(null, null, null, title, lyrics, true)

		return new AddSongUsecaseParams(song, ownerID, audio as StreamFile, feats)
	}
}

export class EditSongUsecaseParams {
	data: Song
	audio: StreamFile | null
	ownerID: number
	artistsIDs: number[] | null

	constructor(
		data: Song,
		ownerID: number,
		audio: StreamFile | null,
		artistsIDs: number[] | null
	) {
		this.data = data
		this.audio = audio
		this.ownerID = ownerID
		this.artistsIDs = artistsIDs
	}

	static fromBackend(dto: EditSongDTO, ownerID: number, audio?: StreamFile | unknown) {
		const { title, feats, lyrics, id, releaseID } = dto

		const song = new Song(id, releaseID, null, title, lyrics, true)

		return new EditSongUsecaseParams(
			song,
			ownerID,
			audio ? (audio as StreamFile) : null,
			feats ? feats : null
		)
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
