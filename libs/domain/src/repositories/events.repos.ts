import { ReplyLayer, EventID, IEventSucc, IEventsListSucc, UserAuthID, ProfileID } from "Shared"
import { Event, File } from "Domain"

export interface EventsRepository {
	create(data: Event, file?: File): Promise<ReplyLayer<boolean>>
	edit(data: Event, file?: File): Promise<ReplyLayer<boolean>>
	delete(id: EventID, userAuth?: UserAuthID): Promise<ReplyLayer<void>>
	get(data: EventID): Promise<ReplyLayer<IEventSucc>>
	getAll(): Promise<ReplyLayer<IEventsListSucc>>
	findManyByArtist(id: EventID): Promise<ReplyLayer<IEventsListSucc>>
	findManyByDate(date: Date): Promise<ReplyLayer<IEventsListSucc>>
	findManyByPlace(place: string): Promise<ReplyLayer<IEventsListSucc>>
}

export interface EventsAddBackRepos {
	getOwner(id: EventID): Promise<number | undefined>
	getImagePath(id: EventID): Promise<string | null | undefined>
}

export interface EventsAddFrontRepos {}

export interface EventsBackendRepos extends EventsRepository, EventsAddBackRepos {}
