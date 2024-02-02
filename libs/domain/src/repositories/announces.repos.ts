import { AnnounceDTO, AnnounceID, AnnounceShortDTO, ProfileID } from "Shared"
import { StreamFile, Announce, File } from "Domain"

export interface AnnouncesRepository {
	create(data: Announce, file?: File): Promise<boolean>
	edit(data: Announce, file?: File): Promise<boolean>
	delete(id: AnnounceID): Promise<boolean>
	get(id: ProfileID): Promise<AnnounceDTO>
	getAll(): Promise<AnnounceShortDTO[]>
	findManyByArtist(id: ProfileID): Promise<AnnounceShortDTO[]>
}

export interface ExtBackAnnouncesRepo {
	getOwner(id: AnnounceID): Promise<number | undefined>
	getImagePath(id: AnnounceID): Promise<string | null | undefined>
	setImagePath(path: string | null, id: AnnounceID): Promise<boolean>
}
export interface ExtFrontAnnouncesRepos {}

export interface AnnouncesBackendRepos extends AnnouncesRepository, ExtBackAnnouncesRepo {
	create(data: Announce, file?: StreamFile): Promise<boolean>
	edit(data: Announce, file?: StreamFile): Promise<boolean>
}
export interface AnnouncesFrontendRepos extends AnnouncesRepository, ExtFrontAnnouncesRepos {
	create(data: Announce, file?: Blob): Promise<boolean>
	edit(data: Announce, file?: Blob): Promise<boolean>
}
