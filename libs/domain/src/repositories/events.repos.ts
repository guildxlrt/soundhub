import {
	EventID,
	GetEventDTO,
	GetEventShortDTO,
	UserAuthID,
	IGetEventShortSuccess,
	IGetEventSuccess,
} from "Shared"
import { Event, File, RawFile, StreamFile } from "Domain"

export interface EventsRepository {
	create(data: Event, file?: File): Promise<boolean>
	edit(data: Event, file?: File): Promise<boolean>
	delete(id: EventID, userAuth?: UserAuthID): Promise<boolean>
	get(id: EventID): Promise<unknown>
	getAll(): Promise<unknown[]>
	findManyByDate(date: Date): Promise<unknown[]>
	findManyByPlace(place: string): Promise<unknown[]>
}

export interface ExtBackEventsRepos {
	getOwner(id: EventID): Promise<number | undefined>
	getImagePath(id: EventID): Promise<string | null | undefined>
	setImagePath(path: string | null, id: EventID): Promise<boolean>
}

export interface ExtFrontEventsRepos {}

export interface EventsBackendRepos extends EventsRepository, ExtBackEventsRepos {
	create(data: Event, file?: StreamFile): Promise<boolean>
	edit(data: Event, file?: StreamFile): Promise<boolean>
	get(id: EventID): Promise<IGetEventSuccess>
	getAll(): Promise<IGetEventShortSuccess[]>
	findManyByDate(date: Date): Promise<IGetEventShortSuccess[]>
	findManyByPlace(place: string): Promise<IGetEventShortSuccess[]>
}
export interface EventsFrontendRepos extends EventsRepository, ExtFrontEventsRepos {
	create(data: Event, file?: RawFile): Promise<boolean>
	edit(data: Event, file?: RawFile): Promise<boolean>
	get(id: EventID): Promise<GetEventDTO>
	getAll(): Promise<GetEventShortDTO[]>
	findManyByDate(date: Date): Promise<GetEventShortDTO[]>
	findManyByPlace(place: string): Promise<GetEventShortDTO[]>
}
