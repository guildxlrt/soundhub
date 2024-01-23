import { ReplyLayer, EventID, IEventSucc, IEventsListSucc, UserAuthID, FileType } from "Shared"
import { Event } from "../entities"

export interface EventsRepository {
	create(data: Event, file?: FileType): Promise<ReplyLayer<boolean>>
	edit(data: Event, file?: FileType): Promise<ReplyLayer<boolean>>
	delete(id: EventID, userAuth?: UserAuthID): Promise<ReplyLayer<void>>
	get(data: EventID): Promise<ReplyLayer<IEventSucc>>
	getAll(): Promise<ReplyLayer<IEventsListSucc>>
	findManyByArtist(id: EventID): Promise<ReplyLayer<IEventsListSucc>>
	findManyByDate(date: Date): Promise<ReplyLayer<IEventsListSucc>>
	findManyByPlace(place: string): Promise<ReplyLayer<IEventsListSucc>>
}
