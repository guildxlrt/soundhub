import { IAnnounceSucc } from "Shared-utils"
import { IdParams, NewAnnounceParams } from "./params"
import { ReplyLayer } from "Shared-utils"

export interface AnnouncesRepository {
	create(inputs: NewAnnounceParams): Promise<ReplyLayer<boolean>>
	delete(inputs: IdParams): Promise<ReplyLayer<unknown>>
	get(inputs: IdParams): Promise<ReplyLayer<IAnnounceSucc>>
	getAll(): Promise<ReplyLayer<IAnnounceSucc[]>>
	findManyByArtist(inputs: IdParams): Promise<ReplyLayer<IAnnounceSucc[]>>
}
