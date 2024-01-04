import { ArtistId, ReleaseId, SongId } from "Shared-utils"
import { EntityLayer } from "../../assets"

export class Song extends EntityLayer {
	release_id: ReleaseId | undefined
	audioUrl: string
	title: string
	featuring: ArtistId[]
	lyrics: string | null

	constructor(
		id: SongId,
		release_id: ReleaseId,
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

		if (featuring !== null && featuring.length >= 1) {
			this.featuring = featuring
		} else {
			this.featuring = []
		}
	}
}
