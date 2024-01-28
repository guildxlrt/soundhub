import {
	ProfileID,
	GenreType,
	INewReleaseSucc,
	IReleaseSucc,
	IReleasesListSucc,
	ReleaseID,
	ReplyLayer,
} from "Shared"
import { File, Release, Song } from "Domain"

export interface ReleasesRepository {
	create(release: unknown, songs: unknown[]): Promise<ReplyLayer<INewReleaseSucc>>
	edit(release: unknown, songs: unknown[]): Promise<ReplyLayer<boolean>>
	setPrivStatus(id: ReleaseID, isPublic?: boolean): Promise<ReplyLayer<boolean>>
	get(data: ReleaseID): Promise<ReplyLayer<IReleaseSucc>>
	getAll(): Promise<ReplyLayer<IReleasesListSucc>>
	findManyByArtist(data: ProfileID): Promise<ReplyLayer<IReleasesListSucc>>
	findManyByGenre(genre: GenreType): Promise<ReplyLayer<IReleasesListSucc>>
}

export interface ReleasesAddBackRepos {
	getOwner(id: number): Promise<number | undefined>
	getCoverPath(releaseID: ReleaseID, ownerID: number): Promise<string | null | undefined>
	getPrivStatus(id: ReleaseID): Promise<boolean>
}
export interface ReleasesAddFrontRepos {}

export interface ReleasesBackendRepos extends ReleasesRepository, ReleasesAddBackRepos {
	create(
		release: { data: Release },
		songs: { data: Song }[]
	): Promise<ReplyLayer<INewReleaseSucc>>
	edit(release: { data: Release; cover?: File }, songs: Song[]): Promise<ReplyLayer<boolean>>
	setPrivStatus(id: ReleaseID, isPublic: boolean): Promise<ReplyLayer<boolean>>
}

export interface ReleasesFrontendRepos extends ReleasesRepository {
	create(
		release: { data: Release; cover: File },
		songs: { data: Song; audio: File }[]
	): Promise<ReplyLayer<INewReleaseSucc>>
	edit(release: { data: Release; cover?: File }, songs: Song[]): Promise<ReplyLayer<boolean>>
}
