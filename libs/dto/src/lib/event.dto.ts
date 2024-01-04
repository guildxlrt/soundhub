import { ArtistId, IEvent } from "Shared-utils"
import { ReplyDTO } from "../assets"

// CREATE POST
export interface CreateEventInputDTO {
	planner: ArtistId
	date: Date
	artists: ArtistId[]
	title: string
	text: string
}
export class CreateEventReplyDTO extends ReplyDTO<boolean> {}

// DELETE POST
export interface DeleteEventInputDTO {
	id: number
}
export class DeleteEventReplyDTO extends ReplyDTO<void> {}

// GET POST
export interface GetEventInputDTO {
	id: number
}
export class GetEventReplyDTO extends ReplyDTO<IEvent> {}

// GET ALL
export class GetAllEventsReplyDTO extends ReplyDTO<IEvent[]> {}

// FIND MANY BY ARTIST
export interface FindEventsByArtistInputDTO {
	id: number
}
export class FindEventsByArtistReplyDTO extends ReplyDTO<IEvent[]> {}
