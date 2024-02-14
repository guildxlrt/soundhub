import { AnyObject } from "../../types"

export class PostRecordDTO {
	readonly title: string
	readonly recordType: string
	readonly descript: string | null
	readonly price: number | null
	readonly genres: string[]
	readonly artistsIDs: number[]

	constructor(
		title: string,
		recordType: string,
		descript: string | null,
		price: number | null,
		genres: string[],
		artistsIDs: number[]
	) {
		this.title = title
		this.recordType = recordType
		this.descript = descript
		this.price = price
		this.genres = genres
		this.artistsIDs = artistsIDs
	}

	static createFromInput(record: AnyObject) {
		return new PostRecordDTO(
			record?.["title"],
			record?.["recordType"],
			record?.["descript"],
			record?.["price"],
			record?.["genres"],
			record?.["artistsIDs"]
		)
	}
}
