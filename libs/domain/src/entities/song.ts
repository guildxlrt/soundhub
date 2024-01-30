import { ProfileID, ReleaseID, SongID } from "Shared"
import { EntityLayer } from "./layers"

export class Song extends EntityLayer {
	readonly release_id: ReleaseID | null
	audioPath: string | null
	readonly title: string
	readonly featuring: ProfileID[]
	lyrics: string | null

	constructor(
		id: SongID | null,
		release_id: ReleaseID | null,
		audioPath: string | null,
		title: string,
		featuring: ProfileID[],
		lyrics: string | null
	) {
		super(id)

		this.release_id = release_id
		this.audioPath = audioPath
		this.title = title
		this.lyrics = lyrics

		featuring !== null && featuring.length >= 1
			? (this.featuring = featuring)
			: (this.featuring = [])
	}

	setAudioPath(newAudioPath: string) {
		this.audioPath = newAudioPath
	}
}
