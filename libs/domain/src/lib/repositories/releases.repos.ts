import {
	ArtistID,
	GenreType,
	INewReleaseSucc,
	IReleaseSucc,
	IReleasesListSucc,
	ReleaseID,
	ReplyLayer,
	UserAuthID,
} from "Shared"
import { Release, Song } from "../entities"

export interface ReleasesRepository {
	create(
		release: Release,
		songs: { data: Song; audio: File }[]
	): Promise<ReplyLayer<INewReleaseSucc>>
	modify(release: Release, songs: Song[]): Promise<ReplyLayer<boolean>>
	hide(id: ReleaseID, isPublic: boolean, userAuth?: UserAuthID): Promise<ReplyLayer<boolean>>
	get(data: ReleaseID): Promise<ReplyLayer<IReleaseSucc>>
	getAll(): Promise<ReplyLayer<IReleasesListSucc>>
	findManyByArtist(data: ArtistID): Promise<ReplyLayer<IReleasesListSucc>>
	findManyByGenre(genre: GenreType): Promise<ReplyLayer<IReleasesListSucc>>
}
