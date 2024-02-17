import {
	EventID,
	GetEventDTO,
	GetEventShortDTO,
	UserAuthID,
	IGetEventShortSuccess,
	IGetEventSuccess,
	ArtistProfileID,
} from "Shared"
import { Event, RawFile } from "Domain"

export interface EventsRepository {
	create(data: unknown): Promise<boolean>
	edit(data: unknown): Promise<boolean>
	delete(id: EventID, userAuth?: UserAuthID): Promise<boolean>
	get(id: EventID): Promise<unknown>
	search(date: Date, place: string): Promise<unknown[]>
}

export interface ExtBackEventsRepos {
	checkRights(id: number, createdBy: number): Promise<boolean>
	getImagePath(id: EventID): Promise<string | null | undefined>
	setImagePath(path: string | null, id: EventID): Promise<boolean>
}

export interface ExtFrontEventsRepos {}

export interface EventsBackendRepos extends EventsRepository, ExtBackEventsRepos {
	create(data: { event: Event; artists: ArtistProfileID[]; file?: RawFile }): Promise<boolean>
	edit(data: Event, file?: RawFile): Promise<boolean>
	get(id: EventID): Promise<IGetEventSuccess>
	search(date: Date, place: string): Promise<IGetEventShortSuccess[]>
}
export interface EventsFrontendRepos extends EventsRepository, ExtFrontEventsRepos {
	create(input: { event: Event; artists: ArtistProfileID[]; file?: RawFile }): Promise<boolean>
	edit(event: { data: Event; file?: RawFile }): Promise<boolean>
	get(id: EventID): Promise<GetEventDTO>
	search(date: Date, place: string): Promise<GetEventShortDTO[]>
}
