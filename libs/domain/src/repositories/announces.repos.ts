import { GetAnnounceDTO, AnnounceID, GetAnnounceShortDTO, ArtistProfileID } from "Shared"
import { StreamFile, Announce, File } from "Domain"

export interface AnnouncesRepository {
	create(data: Announce, file?: File): Promise<boolean>
	edit(data: Announce, file?: File): Promise<boolean>
	delete(id: AnnounceID): Promise<boolean>
	get(id: ArtistProfileID): Promise<GetAnnounceDTO>
	getAll(): Promise<GetAnnounceShortDTO[]>
	findByArtist(id: ArtistProfileID): Promise<GetAnnounceShortDTO[]>
	findByDate(date: Date): Promise<GetAnnounceShortDTO[]>
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
