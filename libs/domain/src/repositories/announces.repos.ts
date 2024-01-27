import {
	AnnounceID,
	ArtistID,
	FileType,
	IAnnounceSucc,
	IAnnouncesListSucc,
	UserAuthID,
} from "Shared"
import { ReplyLayer } from "Shared"
import { Announce } from "Domain"

export interface AnnouncesRepository {
	create(data: Announce, file?: FileType): Promise<ReplyLayer<boolean>>
	edit(data: Announce, file?: FileType): Promise<ReplyLayer<boolean>>
	delete(id: AnnounceID, userAuth?: UserAuthID): Promise<ReplyLayer<void>>
	get(id: ArtistID): Promise<ReplyLayer<IAnnounceSucc>>
	getAll(): Promise<ReplyLayer<IAnnouncesListSucc>>
	findManyByArtist(id: ArtistID): Promise<ReplyLayer<IAnnouncesListSucc>>
}
