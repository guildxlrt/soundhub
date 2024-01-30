import { AnnounceDTO, AnnounceID, AnnounceShortDTO, ProfileID } from "Shared"
import { File, Announce } from "Domain"

export interface AnnouncesRepository {
	create(data: Announce, file?: File): Promise<boolean>
	edit(data: Announce, file?: File): Promise<boolean>
	delete(id: AnnounceID): Promise<boolean>
	get(id: ProfileID): Promise<AnnounceDTO>
	getAll(): Promise<AnnounceShortDTO[]>
	findManyByArtist(id: ProfileID): Promise<AnnounceShortDTO[]>
}

export interface AnnouncesAddBackRepos {
	getOwner(id: AnnounceID): Promise<number | undefined>
	getImagePath(id: AnnounceID): Promise<string | null | undefined>
	setImagePath(path: string | null, id: AnnounceID): Promise<boolean>
}
export interface AnnouncesAddFrontRepos {}

export interface AnnouncesBackendRepos extends AnnouncesRepository, AnnouncesAddBackRepos {}
