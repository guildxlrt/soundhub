import { IMedia, ArtistId, AnnounceId, EventId } from "Shared-utils"

// ANNOUNCE
export interface INewAnnounce {
	artist_id: ArtistId
	title: string
	text: string
	media?: IMedia
}

// EVENT
export interface INewEvent {
	artist_id: ArtistId
	title: string
	text: string
	media?: IMedia
}

export interface IAnnounce {
	id: AnnounceId
	artist_id: ArtistId
	title: string
	text: string
	imageUrl: string | null
	videoUrl: string | null
}

export interface IEvent {
	id: EventId
	date: Date
	organizers: ArtistId[]
	title: string
	text: string
	imageUrl: string | null
}
