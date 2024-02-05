import { IAnnounceSucc, IAnnouncesListSucc } from "Shared-utils"
import { IdParams, ModifyAnnounceParams, NewAnnounceParams } from "./params"
import { ReplyLayer } from "Shared-utils"

export interface AnnouncesRepository {
	create(inputs: NewAnnounceParams): Promise<ReplyLayer<boolean>>
	modify(inputs: ModifyAnnounceParams): Promise<ReplyLayer<boolean>>
	delete(inputs: IdParams): Promise<ReplyLayer<unknown>>
	get(inputs: IdParams): Promise<ReplyLayer<IAnnounceSucc>>
	getAll(): Promise<ReplyLayer<IAnnouncesListSucc>>
	findManyByArtist(inputs: IdParams): Promise<ReplyLayer<IAnnouncesListSucc>>
}
