import { ErrorMsg, RecordID, SongID, htmlError } from "Shared"
import { EntityLayer } from "./layers"
import { StringFormatter } from "../tools"

export class Song extends EntityLayer {
	readonly record_id: RecordID | null
	audioPath: string | null
	title: string
	lyrics: string | null
	isReadOnly: boolean

	private formatter = new StringFormatter()

	constructor(
		id: SongID | null,
		record_id: RecordID | null,
		audioPath: string | null,
		title: string,
		lyrics: string | null,
		isReadOnly: boolean
	) {
		super(id)

		this.record_id = record_id
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
