import { ArtistId, EventId } from "../../types"

// EVENT
export interface IEventSucc {
	id: EventId
	planner: ArtistId
	date: Date
	place: string
	artists: ArtistId[]
	title: string
	text: string
	imageUrl: string | null
}

export type IEventsListSucc = Omit<IEventSucc, "text" | "songs_list">[]
export type IEventsListItemSucc = IEventsListSucc[0]
