import { ArtistId, ISong, ReleaseId, SongId } from "Shared-utils"
import { EntityLayer } from "../../../assets"

export class Song extends EntityLayer implements ISong {
	release_id: ReleaseId
	title: string
	audioUrl: string
	featuring: ArtistId[] | null
	lyrics: string | null

	constructor(
		id: SongId,
		createdAt: Date,
		release_id: ReleaseId,
		title: string,
		audioUrl: string,
		featuring: ArtistId[],
		lyrics: string | null
	) {
		super(id, createdAt)

		this.release_id = release_id
		this.title = title
		this.audioUrl = audioUrl
		this.lyrics = lyrics

		if (featuring !== null && featuring.length >= 1) {
			this.featuring = featuring
		} else {
			this.featuring = []
		}
	}
}
