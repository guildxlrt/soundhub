import { ArtistId, ReleaseId, SongId } from "Shared-utils"
import { BaseEntity } from "../../../assets"

export class Song extends BaseEntity {
	release_id: ReleaseId
	title: string
	audioUrl: string
	featuring: ArtistId[] | null
	lyrics?: string

	constructor(
		id: SongId,
		createdAt: Date,
		release_id: ReleaseId,
		title: string,
		audioUrl: string,
		featuring: ArtistId[],
		lyrics?: string
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
