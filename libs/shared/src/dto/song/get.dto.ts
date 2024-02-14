import { AnyObject } from "../../types"

export class GetSongDTO {
	readonly id: number
	readonly record_id: number
	readonly title: string
	readonly audioPath: string

	constructor(id: number, record_id: number, title: string, audioPath: string) {
		this.id = id
		this.title = title
		this.record_id = record_id
		this.audioPath = audioPath
	}

	static createFromData(data: AnyObject): GetSongDTO {
		return new GetSongDTO(
			data?.["id"],
			data?.["title"],
			data?.["recordType"],
			data?.["audioPath"]
		)
	}

	static createArrayFromData(data: AnyObject[]): GetSongDTO[] {
		return data.map((record): GetSongDTO => {
			return new GetSongDTO(
				record?.["id"],
				record?.["title"],
				record?.["recordType"],
				record?.["audioPath"]
			)
		})
	}
}
