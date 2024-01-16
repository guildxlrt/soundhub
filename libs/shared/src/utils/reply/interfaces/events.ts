import { ArtistId, EventId } from "../../types"

// EVENT
export interface IEventSucc {
	id: EventId | undefined
	owner_id: ArtistId | undefined
	date: Date | undefined
	place: string | undefined
	artists: ArtistId[] | undefined
	title: string | undefined
	text: string | undefined
	imageUrl: string | null | undefined
}

export type IEventsListSucc = Omit<IEventSucc, "text">[]
export type IEventsListItemSucc = IEventsListSucc[0]
