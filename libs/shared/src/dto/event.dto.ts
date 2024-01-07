import { ArtistId, EventId, IEventSucc, IEventsListSucc } from "../utils"
import { ReplyDTO } from "./layers/reply"

// CREATE POST
export interface CreateEventInputDTO {
	planner: ArtistId
	date: Date
	place: string
	artists: ArtistId[]
	title: string
	text: string
}
export class CreateEventReplyDTO extends ReplyDTO<boolean> {}

// CREATE POST
export interface ModifyEventInputDTO {
	date: Date
	place: string
	artists: ArtistId[]
	title: string
	text: string
}
export class ModifyEventReplyDTO extends ReplyDTO<boolean> {}

// DELETE POST
export interface DeleteEventInputDTO {
	id: EventId
}
export class DeleteEventReplyDTO extends ReplyDTO<void> {}

// GET POST
export interface GetEventInputDTO {
	id: EventId
}
export class GetEventReplyDTO extends ReplyDTO<IEventSucc> {}

// GET ALL
export class GetAllEventsReplyDTO extends ReplyDTO<IEventsListSucc> {}

// FIND MANY BY ARTIST
export interface FindEventsByArtistInputDTO {
	id: ArtistId
}
export class FindEventsByArtistReplyDTO extends ReplyDTO<IEventsListSucc> {}

// FIND MANY BY DATE
export interface FindEventsByDateInputDTO {
	date: Date
}
export class FindEventsByDateReplyDTO extends ReplyDTO<IEventsListSucc> {}

// FIND MANY BY LOCATION
export interface FindEventsByPlaceInputDTO {
	place: string
}
export class FindEventsByPlaceReplyDTO extends ReplyDTO<IEventsListSucc> {}
