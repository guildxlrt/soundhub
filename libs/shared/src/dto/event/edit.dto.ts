import { AnyObject } from "../../types"

export class EditEventDTO {
	readonly id: number
	readonly createdBy: number
	readonly date: Date
	readonly place: string
	readonly title: string
	readonly text: string
	readonly delImage?: boolean

	constructor(
		id: number,
		createdBy: number,
		date: Date,
		place: string,
		title: string,
		text: string,
		delImage?: boolean
	) {
		this.id = id
		this.createdBy = createdBy
		this.date = date
		this.place = place
		this.title = title
		this.text = text
		this.delImage = delImage
	}

	static createFromInput(data: AnyObject) {
		return new EditEventDTO(
			data?.["id"],
			data?.["createdBy"],
			data?.["date"],
			data?.["place"],
			data?.["title"],
			data?.["text"]
		)
	}
}
