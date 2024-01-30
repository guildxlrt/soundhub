import { IAnyObject, ProfileID } from "../types"

export class CreateEventDTO {
	readonly date: Date
	readonly place: string
	readonly artists: ProfileID[]
	readonly title: string
	readonly text: string

	constructor(date: Date, place: string, artists: number[], title: string, text: string) {
		this.date = date
		this.place = place
		this.artists = artists
		this.title = title
		this.text = text
	}

	static createFromInput(data: IAnyObject) {
		return new CreateEventDTO(
			data?.["date"],
			data?.["place"],
			data?.["artists"],
			data?.["title"],
			data?.["text"]
		)
	}
}

export class EditEventReqDTO {
	readonly id: number
	readonly owner_id: ProfileID
	readonly date: Date
	readonly place: string
	readonly artists: number[]
	readonly title: string
	readonly text: string

	constructor(
		id: number,
		owner_id: ProfileID,
		date: Date,
		place: string,
		artists: number[],
		title: string,
		text: string
	) {
		this.id = id
		this.owner_id = owner_id
		this.date = date
		this.place = place
		this.artists = artists
		this.title = title
		this.text = text
	}

	static createFromInput(data: IAnyObject) {
		return new EditEventReqDTO(
			data?.["id"],
			data?.["owner_id"],
			data?.["date"],
			data?.["place"],
			data?.["artists"],
			data?.["title"],
			data?.["text"]
		)
	}
}

export class EventDTO {
	readonly id: number
	readonly owner_id: ProfileID
	readonly date: Date
	readonly place: string
	readonly artists: number[]
	readonly title: string
	readonly text: string
	readonly imagePath: string | null

	constructor(
		id: number,
		owner_id: ProfileID,
		date: Date,
		place: string,
		artists: number[],
		title: string,
		text: string,
		imagePath: string | null
	) {
		this.id = id
		this.owner_id = owner_id
		this.date = date
		this.place = place
		this.artists = artists
		this.title = title
		this.text = text
		this.imagePath = imagePath
	}

	static createFromData(data: IAnyObject) {
		return new EventDTO(
			data?.["id"],
			data?.["owner_id"],
			data?.["date"],
			data?.["place"],
			data?.["artists"],
			data?.["title"],
			data?.["text"],
			data?.["imagePath"]
		)
	}
}

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

	static createFromData(data: IAnyObject): EventShortDTO {
		return new EventShortDTO(
			data?.["id"],
			data?.["date"],
			data?.["place"],
			data?.["artists"],
			data?.["title"]
		)
	}
	static createArrayFromData(data: IAnyObject[]): EventShortDTO[] {
		return data.map((annouce): EventShortDTO => {
			return new EventDTO(
				annouce?.["id"],
				annouce?.["owner_id"],
				annouce?.["date"],
				annouce?.["place"],
				annouce?.["artists"],
				annouce?.["title"],
				annouce?.["text"],
				annouce?.["imagePath"]
			)
		})
	}
}
