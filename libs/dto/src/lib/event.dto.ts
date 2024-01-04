import { ArtistId, EventId, IEvent } from "Shared-utils"
import { ReplyDTO } from "../assets"

// CREATE POST
export interface CreateEventInputDTO {
	planner: ArtistId
	date: Date
	location: string
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
export class GetEventReplyDTO extends ReplyDTO<IEvent> {}

// GET ALL
export class GetAllEventsReplyDTO extends ReplyDTO<IEvent[]> {}

// FIND MANY BY ARTIST
export interface FindEventsByArtistInputDTO {
	id: ArtistId
}
export class FindEventsByArtistReplyDTO extends ReplyDTO<IEvent[]> {}

// FIND MANY BY DATE
export interface FindEventsByDateInputDTO {
	date: Date
}
export class FindEventsByDateReplyDTO extends ReplyDTO<IEvent[]> {}

// FIND MANY BY LOCATION
export interface FindEventsByLocationInputDTO {
	location: string
}
export class FindEventsByLocationReplyDTO extends ReplyDTO<IEvent[]> {}
