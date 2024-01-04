import { ArtistId, EventId, IEventSucc } from "Shared-utils"
import { ReplyDTO } from "../assets"

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
export class GetAllEventsReplyDTO extends ReplyDTO<IEventSucc[]> {}

// FIND MANY BY ARTIST
export interface FindEventsByArtistInputDTO {
	id: ArtistId
}
export class FindEventsByArtistReplyDTO extends ReplyDTO<IEventSucc[]> {}

// FIND MANY BY DATE
export interface FindEventsByDateInputDTO {
	date: Date
}
export class FindEventsByDateReplyDTO extends ReplyDTO<IEventSucc[]> {}

// FIND MANY BY LOCATION
export interface FindEventsByPlaceInputDTO {
	place: string
}
export class FindEventsByPlaceReplyDTO extends ReplyDTO<IEventSucc[]> {}
