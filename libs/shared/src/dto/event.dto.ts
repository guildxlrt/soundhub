import { ArtistID, IEventSucc, IEventsListSucc } from "../assets"
import { ReplyDTO } from "./layers/reply"

export class CreateEventReqDTO {
	readonly owner_id: ArtistID
	readonly date: Date
	readonly place: string
	readonly artists: ArtistID[]
	readonly title: string
	readonly text: string

	constructor(
		owner_id: ArtistID,
		date: Date,
		place: string,
		artists: number[],
		title: string,
		text: string
	) {
		this.owner_id = owner_id
		this.date = date
		this.place = place
		this.artists = artists
		this.title = title
		this.text = text
	}
}
export class CreateEventReplyDTO extends ReplyDTO<boolean> {}

export class EditEventReqDTO {
	readonly id: number
	readonly owner_id: ArtistID
	readonly date: Date
	readonly place: string
	readonly artists: number[]
	readonly title: string
	readonly text: string
	readonly imagePath: string | null

	constructor(
		id: number,
		owner_id: ArtistID,
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
}
export class EditEventReplyDTO extends ReplyDTO<boolean> {}

// DELETE POST
export class DeleteEventReplyDTO extends ReplyDTO<void> {}

// GET POST
export class GetEventReplyDTO extends ReplyDTO<IEventSucc> {}

// GET ALL
export class GetAllEventsReplyDTO extends ReplyDTO<IEventsListSucc> {}

// FIND MANY BY ARTIST
export class FindEventsByArtistReplyDTO extends ReplyDTO<IEventsListSucc> {}

// FIND MANY BY DATE
export class FindEventsByDateReqDTO {
	date: Date

	constructor(date: Date) {
		this.date = date
	}
}
export class FindEventsByDateReplyDTO extends ReplyDTO<IEventsListSucc> {}

// FIND MANY BY LOCATION
export class FindEventsByPlaceReqDTO {
	place: string

	constructor(place: string) {
		this.place = place
	}
}
export class FindEventsByPlaceReplyDTO extends ReplyDTO<IEventsListSucc> {}
