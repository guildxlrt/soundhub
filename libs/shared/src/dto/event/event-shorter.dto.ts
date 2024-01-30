import { AnyObject } from "../../types"

export class EventShortDTO {
	readonly id: number
	readonly date: Date
	readonly place: string
	readonly artists: number[]
	readonly title: string

	constructor(id: number, date: Date, place: string, artists: number[], title: string) {
		this.id = id
		this.date = date
		this.place = place
		this.artists = artists
		this.title = title
	}

	static createFromData(data: AnyObject): EventShortDTO {
		return new EventShortDTO(
			data?.["id"],
			data?.["date"],
			data?.["place"],
			data?.["artists"],
			data?.["title"]
		)
	}
	static createArrayFromData(data: AnyObject[]): EventShortDTO[] {
		return data.map((annouce): EventShortDTO => {
			return new EventShortDTO(
				annouce?.["id"],
				annouce?.["date"],
				annouce?.["place"],
				annouce?.["artists"],
				annouce?.["title"]
			)
		})
	}
}
