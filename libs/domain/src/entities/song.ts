import { ErrorMsg, ReleaseID, SongID, htmlError } from "Shared"
import { EntityLayer } from "./layers"
import { StringFormatter } from "../tools"

export class Song extends EntityLayer {
	readonly release_id: ReleaseID | null
	audioPath: string | null
	title: string
	lyrics: string | null
	isReadOnly: boolean

	private formatter = new StringFormatter()

	constructor(
		id: SongID | null,
		release_id: ReleaseID | null,
		audioPath: string | null,
		title: string,
		lyrics: string | null,
		isReadOnly: boolean
	) {
		super(id)

		this.release_id = release_id
		this.audioPath = audioPath
		this.title = title
		this.lyrics = lyrics
		this.isReadOnly = isReadOnly
	}

	setAudioPath(newAudioPath: string) {
		if (this.isReadOnly !== true) throw ErrorMsg.htmlError(htmlError[403])

		this.audioPath = newAudioPath
	}

	async sanitize(isNew?: true) {
		if (this.isReadOnly !== true) throw ErrorMsg.htmlError(htmlError[403])
		if (isNew) this.title = this.formatter.short(this.title)

		this.lyrics = this.formatter.long(this.lyrics)
	}
}
