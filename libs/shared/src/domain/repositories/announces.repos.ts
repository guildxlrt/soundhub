import { EntityId, IAnnounceSucc, IAnnouncesListSucc } from "../../utils"
import { ReplyLayer } from "../../utils"

export interface AnnouncesRepository {
	create(inputs: unknown): Promise<ReplyLayer<boolean>>
	modify(inputs: unknown): Promise<ReplyLayer<boolean>>
	delete(inputs: unknown): Promise<ReplyLayer<unknown>>
	get(inputs: EntityId): Promise<ReplyLayer<IAnnounceSucc>>
	getAll(): Promise<ReplyLayer<IAnnouncesListSucc>>
	findManyByArtist(inputs: EntityId): Promise<ReplyLayer<IAnnouncesListSucc>>
}
