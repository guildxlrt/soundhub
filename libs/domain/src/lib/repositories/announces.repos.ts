import { AnnounceID, ArtistID, IAnnounceSucc, IAnnouncesListSucc, UserAuthID } from "Shared"
import { ReplyLayer } from "Shared"
import { Announce } from "../entities"

export interface AnnouncesRepository {
	create(data: Announce, file?: File): Promise<ReplyLayer<boolean>>
	modify(data: Announce, file?: File): Promise<ReplyLayer<boolean>>
	delete(id: AnnounceID, userAuth?: UserAuthID): Promise<ReplyLayer<void>>
	get(id: ArtistID): Promise<ReplyLayer<IAnnounceSucc>>
	getAll(): Promise<ReplyLayer<IAnnouncesListSucc>>
	findManyByArtist(id: ArtistID): Promise<ReplyLayer<IAnnouncesListSucc>>
}
