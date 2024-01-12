import { EntityId, IEventSucc, IEventsListSucc } from "../../utils"
import { ReplyLayer } from "../../utils"

export interface EventsRepository {
	create(inputs: unknown): Promise<ReplyLayer<boolean>>
	modify(inputs: unknown): Promise<ReplyLayer<boolean>>
	delete(inputs: unknown): Promise<ReplyLayer<unknown>>
	get(inputs: EntityId): Promise<ReplyLayer<IEventSucc>>
	getAll(): Promise<ReplyLayer<IEventsListSucc>>
	findManyByArtist(inputs: EntityId): Promise<ReplyLayer<IEventsListSucc>>
	findManyByDate(inputs: unknown): Promise<ReplyLayer<IEventsListSucc>>
	findManyByPlace(inputs: unknown): Promise<ReplyLayer<IEventsListSucc>>
}
