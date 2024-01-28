import { ProfileID, EventID } from "../../types"

// EVENT
export interface IEventSucc {
	id: EventID | undefined
	owner_id: ProfileID | undefined
	date: Date | undefined
	place: string | undefined
	artists: ProfileID[] | undefined
	title: string | undefined
	text: string | undefined
	imagePath: string | null | undefined
}

export type IEventsListSucc = Omit<IEventSucc, "text">[]
export type IEventsListItemSucc = IEventsListSucc[0]
