import { IMedia, ArtistId, EventId } from "Shared-utils"

// EVENT
export interface IEvent {
	id: EventId
	planner: ArtistId
	date: Date
	artists: ArtistId[]
	title: string
	text: string
	imageUrl: string | null
}

export interface INewEvent {
	planner: ArtistId
	date: Date
	artists: ArtistId[]
	title: string
	text: string
	media?: IMedia
}
