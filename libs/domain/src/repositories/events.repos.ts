import { EventID, EventDTO, EventShortDTO, UserAuthID } from "Shared"
import { Event, File, RawFile, StreamFile } from "Domain"

export interface EventsRepository {
	create(data: Event, file?: File): Promise<boolean>
	edit(data: Event, file?: File): Promise<boolean>
	delete(id: EventID, userAuth?: UserAuthID): Promise<boolean>
	get(id: EventID): Promise<EventDTO>
	getAll(): Promise<EventShortDTO[]>
	findManyByArtist(id: EventID): Promise<EventShortDTO[]>
	findManyByDate(date: Date): Promise<EventShortDTO[]>
	findManyByPlace(place: string): Promise<EventShortDTO[]>
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
}
export interface EventsFrontendRepos extends EventsRepository, ExtFrontEventsRepos {
	create(data: Event, file?: RawFile): Promise<boolean>
	edit(data: Event, file?: RawFile): Promise<boolean>
}
