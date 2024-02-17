import { AnyObject } from "../../types"

export class GetEventDTO {
	readonly id: number
	readonly createdBy: number
	readonly date: Date
	readonly place: string
	readonly artists: number[]
	readonly title: string
	readonly text: string
	readonly imagePath: string | null

	constructor(
		id: number,
		createdBy: number,
		date: Date,
		place: string,
		artists: number[],
		title: string,
		text: string,
		imagePath: string | null
	) {
		this.id = id
		this.createdBy = createdBy
		this.date = date
		this.place = place
		this.artists = artists
		this.title = title
		this.text = text
		this.imagePath = imagePath
	}

	static createFromData(data: AnyObject) {
		return new GetEventDTO(
			data?.["id"],
			data?.["createdBy"],
			data?.["date"],
			data?.["place"],
			data?.["artists"],
			data?.["title"],
			data?.["text"],
			data?.["imagePath"]
		)
	}
}
