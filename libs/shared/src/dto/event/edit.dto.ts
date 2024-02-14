import { AnyObject } from "../../types"

export class EditEventDTO {
	readonly id: number
	readonly organisator_id: number
	readonly date: Date
	readonly place: string
	readonly title: string
	readonly text: string
	readonly delImage?: boolean

	constructor(
		id: number,
		organisator_id: number,
		date: Date,
		place: string,
		title: string,
		text: string,
		delImage?: boolean
	) {
		this.id = id
		this.organisator_id = organisator_id
		this.date = date
		this.place = place
		this.title = title
		this.text = text
		this.delImage = delImage
	}

	static createFromInput(data: AnyObject) {
		return new EditEventDTO(
			data?.["id"],
			data?.["organisator_id"],
			data?.["date"],
			data?.["place"],
			data?.["title"],
			data?.["text"]
		)
	}
}
