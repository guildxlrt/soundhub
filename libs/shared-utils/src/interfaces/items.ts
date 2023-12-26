import { IMedia, ArtistId, EventId } from "Shared-utils"

// ANNOUNCE
export interface IAnnounce {
	artist_id: ArtistId
	title: string
	text: string
	imageUrl: string | null
	videoUrl: string | null
}

export interface INewAnnounce {
	artist_id: ArtistId
	title: string
	text: string
	media?: IMedia
}

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
