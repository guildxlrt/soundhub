import { AnyObject } from "../../types"

export class PostSongDTO {
	readonly title: string
	readonly feats: number[]
	readonly lyrics: string | null

	constructor(title: string, feats: number[], lyrics: string | null) {
		this.title = title
		this.feats = feats
		this.lyrics = lyrics
	}

	static createFromInput(song: AnyObject) {
		return new PostSongDTO(song?.["title"], song?.["feats"], song?.["lyrics"])
	}
}
