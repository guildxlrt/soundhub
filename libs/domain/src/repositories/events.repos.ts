import {
	EventID,
	GetEventDTO,
	GetEventShortDTO,
	UserAuthID,
	IGetEventShortSuccess,
	IGetEventSuccess,
	ArtistProfileID,
} from "Shared"
import { Event, RawFile, StreamFile } from "Domain"

export interface EventsRepository {
	create(data: unknown): Promise<boolean>
	edit(data: unknown): Promise<boolean>
	delete(id: EventID, userAuth?: UserAuthID): Promise<boolean>
	get(id: EventID): Promise<unknown>
	getAll(): Promise<unknown[]>
	findByDate(date: Date): Promise<unknown[]>
	findByPlace(place: string): Promise<unknown[]>
}

export interface ExtBackEventsRepos {
	getOwner(id: EventID): Promise<number | undefined>
	getImagePath(id: EventID): Promise<string | null | undefined>
	setImagePath(path: string | null, id: EventID): Promise<boolean>
}

export interface ExtFrontEventsRepos {}

export interface EventsBackendRepos extends EventsRepository, ExtBackEventsRepos {
	create(data: { event: Event; artists: ArtistProfileID[]; file?: RawFile }): Promise<boolean>
	edit(data: Event, file?: StreamFile): Promise<boolean>
	get(id: EventID): Promise<IGetEventSuccess>
	getAll(): Promise<IGetEventShortSuccess[]>
	findByDate(date: Date): Promise<IGetEventShortSuccess[]>
	findByPlace(place: string): Promise<IGetEventShortSuccess[]>
}
export interface EventsFrontendRepos extends EventsRepository, ExtFrontEventsRepos {
	create(data: { event: Event; artists: ArtistProfileID[]; file?: RawFile }): Promise<boolean>
	edit(data: { event: Event; file?: RawFile }): Promise<boolean>
	get(id: EventID): Promise<GetEventDTO>
	getAll(): Promise<GetEventShortDTO[]>
	findByDate(date: Date): Promise<GetEventShortDTO[]>
	findByPlace(place: string): Promise<GetEventShortDTO[]>
}
