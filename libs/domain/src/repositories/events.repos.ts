import { ReplyLayer, EventID, IEventSucc, IEventsListSucc, UserAuthID, ProfileID } from "Shared"
import { Event, File } from "Domain"

export interface EventsRepository {
	create(data: Event, file?: File): Promise<boolean>
	edit(data: Event, file?: File): Promise<boolean>
	delete(id: EventID, userAuth?: UserAuthID): Promise<void>
	get(data: EventID): Promise<IEventSucc>
	getAll(): Promise<IEventsListSucc>
	findManyByArtist(id: EventID): Promise<IEventsListSucc>
	findManyByDate(date: Date): Promise<IEventsListSucc>
	findManyByPlace(place: string): Promise<IEventsListSucc>
}

export interface EventsAddBackRepos {
	getOwner(id: EventID): Promise<number | undefined>
	getImagePath(id: EventID): Promise<string | null | undefined>
}

export interface EventsAddFrontRepos {}

export interface EventsBackendRepos extends EventsRepository, EventsAddBackRepos {}
