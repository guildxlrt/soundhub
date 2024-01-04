import { IEventSucc } from "Shared-utils"
import { DateParams, IdParams, NewEventParams, PlaceParams } from "./params"
import { ReplyLayer } from "Shared-utils"

export interface EventsRepository {
	create(inputs: NewEventParams): Promise<ReplyLayer<boolean>>
	delete(inputs: IdParams): Promise<ReplyLayer<unknown>>
	get(inputs: IdParams): Promise<ReplyLayer<IEventSucc>>
	getAll(): Promise<ReplyLayer<IEventSucc[]>>
	findManyByArtist(inputs: IdParams): Promise<ReplyLayer<IEventSucc[]>>
	findManyByDate(inputs: DateParams): Promise<ReplyLayer<IEventSucc[]>>
	findManyByPlace(inputs: PlaceParams): Promise<ReplyLayer<IEventSucc[]>>
}
