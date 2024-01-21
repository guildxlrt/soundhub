import { ArtistID, ReleaseID, SongID } from "Shared"
import { EntityLayer } from "./layers"

export class Song extends EntityLayer {
	readonly release_id: ReleaseID | null
	readonly audioUrl: string
	readonly title: string
	readonly featuring: ArtistID[]
	lyrics: string | null

	constructor(
		id: SongID | null,
		release_id: ReleaseID | null,
		audioUrl: string,
		title: string,
		featuring: ArtistID[],
		lyrics: string | null
	) {
		super(id)

		this.release_id = release_id
		this.audioUrl = audioUrl
		this.title = title
		this.lyrics = lyrics

		featuring !== null && featuring.length >= 1
			? (this.featuring = featuring)
			: (this.featuring = [])
	}
}
