import { AnyObject } from "../../types"

export class EditSongDTO {
	readonly id: number
	readonly recordID: number
	readonly title: string
	readonly feats: number[]
	readonly lyrics: string | null

	constructor(
		id: number,
		recordID: number,
		title: string,
		feats: number[],
		lyrics: string | null
	) {
		this.id = id
		this.recordID = recordID
		this.title = title
		this.feats = feats
		this.lyrics = lyrics
	}

	static createFromInput(song: AnyObject) {
		return new EditSongDTO(
			song?.["id"],
			song?.["record_id"],
			song?.["title"],
			song?.["feats"],
			song?.["lyrics"]
		)
	}
}
