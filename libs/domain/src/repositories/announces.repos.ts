import { AnnounceID, ProfileID, IAnnounceSucc, IAnnouncesListSucc } from "Shared"
import { ReplyLayer } from "Shared"
import { File, Announce } from "Domain"

export interface AnnouncesRepository {
	create(data: Announce, file?: File): Promise<ReplyLayer<boolean>>
	edit(data: Announce, file?: File): Promise<ReplyLayer<boolean>>
	delete(id: AnnounceID): Promise<ReplyLayer<void>>
	get(id: ProfileID): Promise<ReplyLayer<IAnnounceSucc>>
	getAll(): Promise<ReplyLayer<IAnnouncesListSucc>>
	findManyByArtist(id: ProfileID): Promise<ReplyLayer<IAnnouncesListSucc>>
}

export interface AnnouncesAddBackRepos {
	getOwner(id: AnnounceID): Promise<number | undefined>
	getImagePath(id: AnnounceID): Promise<string | null | undefined>
}
export interface AnnouncesAddFrontRepos {}

export interface AnnouncesBackendRepos extends AnnouncesRepository, AnnouncesAddBackRepos {}
