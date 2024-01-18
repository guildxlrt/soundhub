import { ArtistId, ISong, ReleaseId, SongId } from "Shared"
import { EntityLayer } from "./layers"

export class Song extends EntityLayer implements ISong {
	release_id: ReleaseId | undefined
	audioUrl: string
	title: string
	featuring: ArtistId[]
	lyrics: string | null

	constructor(
		id: SongId | undefined,
		release_id: ReleaseId | undefined,
		audioUrl: string,
		title: string,
		featuring: ArtistId[],
		lyrics: string | null,
		createdAt?: Date
	) {
		super(id, createdAt)

		this.release_id = release_id
		this.audioUrl = audioUrl
		this.title = title
		this.lyrics = lyrics

		featuring !== null && featuring.length >= 1
			? (this.featuring = featuring)
			: (this.featuring = [])
	}
}
