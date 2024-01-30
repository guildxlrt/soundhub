import { IAnyObject } from "../types"

export class SongDTO {
	readonly id: number
	readonly release_id: number
	readonly title: string
	readonly audioPath: string

	constructor(id: number, release_id: number, title: string, audioPath: string) {
		this.id = id
		this.title = title
		this.release_id = release_id
		this.audioPath = audioPath
	}

	static createFromData(data: IAnyObject): SongDTO {
		return new SongDTO(
			data?.["id"],
			data?.["title"],
			data?.["releaseType"],
			data?.["audioPath"]
		)
	}

	static createArrayFromData(data: IAnyObject[]): SongDTO[] {
		return data.map((release): SongDTO => {
			return new SongDTO(
				release?.["id"],
				release?.["title"],
				release?.["releaseType"],
				release?.["audioPath"]
			)
		})
	}
}
