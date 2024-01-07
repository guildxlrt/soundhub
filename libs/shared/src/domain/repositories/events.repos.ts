import { IEventSucc } from "../../utils"
import { DateParams, IdParams, ModifyEventParams, NewEventParams, PlaceParams } from "./params"
import { ReplyLayer } from "../../utils"

export interface EventsRepository {
	create(inputs: NewEventParams): Promise<ReplyLayer<boolean>>
	modify(inputs: ModifyEventParams): Promise<ReplyLayer<boolean>>
	delete(inputs: IdParams): Promise<ReplyLayer<unknown>>
	get(inputs: IdParams): Promise<ReplyLayer<IEventSucc>>
	getAll(): Promise<ReplyLayer<IEventSucc[]>>
	findManyByArtist(inputs: IdParams): Promise<ReplyLayer<IEventSucc[]>>
	findManyByDate(inputs: DateParams): Promise<ReplyLayer<IEventSucc[]>>
	findManyByPlace(inputs: PlaceParams): Promise<ReplyLayer<IEventSucc[]>>
}
