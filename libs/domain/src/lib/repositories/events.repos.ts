import { ReplyLayer, EventID, IEventSucc, IEventsListSucc, UserAuthID } from "Shared"
import { Event } from "../entities"

export interface EventsRepository {
	create(data: Event, file?: File): Promise<ReplyLayer<boolean>>
	modify(data: Event, file?: File): Promise<ReplyLayer<boolean>>
	delete(id: EventID, userAuth?: UserAuthID): Promise<ReplyLayer<void>>
	get(data: EventID): Promise<ReplyLayer<IEventSucc>>
	getAll(): Promise<ReplyLayer<IEventsListSucc>>
	findManyByArtist(id: EventID): Promise<ReplyLayer<IEventsListSucc>>
	findManyByDate(date: Date): Promise<ReplyLayer<IEventsListSucc>>
	findManyByPlace(place: string): Promise<ReplyLayer<IEventsListSucc>>
}
