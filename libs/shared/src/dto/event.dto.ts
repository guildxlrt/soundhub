import { ArtistId, IEventSucc, IEventsListSucc } from "../utils"
import { ReplyDTO } from "./layers/reply"

// CREATE POST
export class CreateEventReqDTO {
	owner_id: ArtistId
	date: Date
	place: string
	artists: ArtistId[]
	title: string
	text: string

	constructor(
		owner_id: ArtistId,
		date: Date,
		place: string,
		artists: ArtistId[],
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

// CREATE POST
export class ModifyEventReqDTO {
	date: Date
	place: string
	artists: ArtistId[]
	title: string
	text: string

	constructor(date: Date, place: string, artists: ArtistId[], title: string, text: string) {
		this.date = date
		this.place = place
		this.artists = artists
		this.title = title
		this.text = text
	}
}
export class ModifyEventReplyDTO extends ReplyDTO<boolean> {}

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
