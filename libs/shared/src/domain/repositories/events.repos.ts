import { IEventSucc, IEventsListSucc } from "../../utils"
import { DateParams, IdParams, ModifyEventParams, NewEventParams, PlaceParams } from "./params"
import { ReplyLayer } from "../../utils"

export interface EventsRepository {
	create(inputs: NewEventParams): Promise<ReplyLayer<boolean>>
	modify(inputs: ModifyEventParams): Promise<ReplyLayer<boolean>>
	delete(inputs: IdParams): Promise<ReplyLayer<unknown>>
	get(inputs: IdParams): Promise<ReplyLayer<IEventSucc>>
	getAll(): Promise<ReplyLayer<IEventsListSucc>>
	findManyByArtist(inputs: IdParams): Promise<ReplyLayer<IEventsListSucc>>
	findManyByDate(inputs: DateParams): Promise<ReplyLayer<IEventsListSucc>>
	findManyByPlace(inputs: PlaceParams): Promise<ReplyLayer<IEventsListSucc>>
}
