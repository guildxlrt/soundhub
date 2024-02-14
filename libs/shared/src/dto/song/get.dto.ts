import { AnyObject } from "../../types"

export class GetSongDTO {
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

	static createFromData(data: AnyObject): GetSongDTO {
		return new GetSongDTO(
			data?.["id"],
			data?.["title"],
			data?.["releaseType"],
			data?.["audioPath"]
		)
	}

	static createArrayFromData(data: AnyObject[]): GetSongDTO[] {
		return data.map((release): GetSongDTO => {
			return new GetSongDTO(
				release?.["id"],
				release?.["title"],
				release?.["releaseType"],
				release?.["audioPath"]
			)
		})
	}
}
