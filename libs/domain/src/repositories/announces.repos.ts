import { GetAnnounceDTO, AnnounceID, GetAnnounceShortDTO, ArtistProfileID } from "Shared"
import { RawFile, Announce, File } from "Domain"

export interface AnnouncesRepository {
	create(data: Announce, file?: File): Promise<boolean>
	edit(data: Announce, file?: File): Promise<boolean>
	delete(id: AnnounceID): Promise<boolean>
	get(id: ArtistProfileID): Promise<GetAnnounceDTO>
	search(id: ArtistProfileID, date: Date): Promise<GetAnnounceShortDTO[]>
}

export interface ExtBackAnnouncesRepo {
	checkRights(id: number, createdBy: number): Promise<boolean>
	getImagePath(id: AnnounceID): Promise<string | null | undefined>
	setImagePath(path: string | null, id: AnnounceID): Promise<boolean>
}
export interface ExtFrontAnnouncesRepos {}

export interface AnnouncesBackendRepos extends AnnouncesRepository, ExtBackAnnouncesRepo {
	create(data: Announce, file?: RawFile): Promise<boolean>
	edit(data: Announce, file?: RawFile): Promise<boolean>
}
export interface AnnouncesFrontendRepos extends AnnouncesRepository, ExtFrontAnnouncesRepos {
	create(data: Announce, file?: Blob): Promise<boolean>
	edit(data: Announce, file?: Blob): Promise<boolean>
}
