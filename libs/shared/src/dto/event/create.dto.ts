import { AnyObject } from "../../types"

export class CreateEventDTO {
	readonly date: Date
	readonly place: string
	readonly artists: number[]
	readonly title: string
	readonly text: string

	constructor(date: Date, place: string, artists: number[], title: string, text: string) {
		this.date = date
		this.place = place
		this.artists = artists
		this.title = title
		this.text = text
	}

	static createFromInput(data: AnyObject) {
		return new CreateEventDTO(
			data?.["date"],
			data?.["place"],
			data?.["artists"],
			data?.["title"],
			data?.["text"]
		)
	}
}
