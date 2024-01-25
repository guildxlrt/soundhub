import { ArtistID, EventID } from "../typing"

// EVENT
export interface IEventSucc {
	id: EventID | undefined
	owner_id: ArtistID | undefined
	date: Date | undefined
	place: string | undefined
	artists: ArtistID[] | undefined
	title: string | undefined
	text: string | undefined
	imagePath: string | null | undefined
}

export type IEventsListSucc = Omit<IEventSucc, "text">[]
export type IEventsListItemSucc = IEventsListSucc[0]
