import { ReplyLayer, EntityId, IEventSucc, IEventsListSucc } from "Shared"

export interface EventsRepository {
	create(inputs: unknown): Promise<ReplyLayer<boolean>>
	modify(inputs: unknown): Promise<ReplyLayer<boolean>>
	delete(inputs: unknown): Promise<ReplyLayer<void>>
	get(inputs: EntityId): Promise<ReplyLayer<IEventSucc>>
	getAll(): Promise<ReplyLayer<IEventsListSucc>>
	findManyByArtist(inputs: EntityId): Promise<ReplyLayer<IEventsListSucc>>
	findManyByDate(inputs: unknown): Promise<ReplyLayer<IEventsListSucc>>
	findManyByPlace(inputs: unknown): Promise<ReplyLayer<IEventsListSucc>>
}
