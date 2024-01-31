import { EventID, EventDTO, EventShortDTO, UserAuthID } from "Shared"
import { Event, File } from "Domain"

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

export interface EventsAddBackRepos {
	getOwner(id: EventID): Promise<number | undefined>
	getImagePath(id: EventID): Promise<string | null | undefined>
	setImagePath(path: string | null, id: EventID): Promise<boolean>
}

export interface EventsAddFrontRepos {}

export interface EventsBackendRepos extends EventsRepository, EventsAddBackRepos {}
