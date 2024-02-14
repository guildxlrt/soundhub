import { AnyObject } from "../../types"

export class GetShortRecordDTO {
	readonly id: number

	readonly title: string
	readonly recordType: string
	readonly genres: string[]

	constructor(id: number, title: string, recordType: string, genres: string[]) {
		this.id = id
		this.title = title
		this.recordType = recordType
		this.genres = genres
	}

	static createFromData(data: AnyObject): GetShortRecordDTO {
		return new GetShortRecordDTO(
			data?.["id"],
			data?.["title"],
			data?.["recordType"],
			data?.["genres"]
		)
	}

	static createArrayFromData(data: AnyObject[]): GetShortRecordDTO[] {
		return data.map((record): GetShortRecordDTO => {
			return new GetShortRecordDTO(
				record?.["id"],
				record?.["title"],
				record?.["recordType"],
				record?.["genres"]
			)
		})
	}
}
