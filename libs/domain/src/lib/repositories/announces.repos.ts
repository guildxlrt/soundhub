import { EntityId, IAnnounceSucc, IAnnouncesListSucc } from "Shared"
import { ReplyLayer } from "Shared"

export interface AnnouncesRepository {
	create(inputs: unknown): Promise<ReplyLayer<boolean>>
	modify(inputs: unknown): Promise<ReplyLayer<boolean>>
	delete(inputs: unknown): Promise<ReplyLayer<void>>
	get(inputs: EntityId): Promise<ReplyLayer<IAnnounceSucc>>
	getAll(): Promise<ReplyLayer<IAnnouncesListSucc>>
	findManyByArtist(inputs: EntityId): Promise<ReplyLayer<IAnnouncesListSucc>>
}
