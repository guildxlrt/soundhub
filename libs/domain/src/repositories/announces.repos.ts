import { AnnounceID, ProfileID, IAnnounceSucc, IAnnouncesListSucc } from "Shared"
import { ReplyLayer } from "Shared"
import { File, Announce } from "Domain"

export interface AnnouncesRepository {
	create(data: Announce, file?: File): Promise<boolean>
	edit(data: Announce, file?: File): Promise<boolean>
	delete(id: AnnounceID): Promise<void>
	get(id: ProfileID): Promise<IAnnounceSucc>
	getAll(): Promise<IAnnouncesListSucc>
	findManyByArtist(id: ProfileID): Promise<IAnnouncesListSucc>
}

export interface AnnouncesAddBackRepos {
	getOwner(id: AnnounceID): Promise<number | undefined>
	getImagePath(id: AnnounceID): Promise<string | null | undefined>
}
export interface AnnouncesAddFrontRepos {}

export interface AnnouncesBackendRepos extends AnnouncesRepository, AnnouncesAddBackRepos {}
