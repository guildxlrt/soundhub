import {
	ProfileID,
	GenreType,
	INewReleaseSucc,
	IReleaseSucc,
	IReleasesListSucc,
	ReleaseID,
} from "Shared"
import { File, Release, Song } from "Domain"

export interface ReleasesRepository {
	create(release: unknown, songs: unknown[]): Promise<INewReleaseSucc>
	edit(release: unknown, songs?: unknown[]): Promise<boolean>
	setPrivStatus(id: ReleaseID, isPublic?: boolean): Promise<boolean>
	get(data: ReleaseID): Promise<IReleaseSucc>
	getAll(): Promise<IReleasesListSucc>
	findManyByArtist(data: ProfileID): Promise<IReleasesListSucc>
	findManyByGenre(genre: GenreType): Promise<IReleasesListSucc>
}

export interface ReleasesAddBackRepos {
	getOwner(id: number): Promise<number | undefined>
	getCoverPath(releaseID: ReleaseID): Promise<string | null | undefined>
	getPrivStatus(id: ReleaseID): Promise<boolean>
}
export interface ReleasesAddFrontRepos {}

export interface ReleasesBackendRepos extends ReleasesRepository, ReleasesAddBackRepos {
	create(release: { data: Release }, songs: { data: Song }[]): Promise<INewReleaseSucc>
	edit(release: { data: Release }): Promise<boolean>
	setPrivStatus(id: ReleaseID, isPublic: boolean): Promise<boolean>
}

export interface ReleasesFrontendRepos extends ReleasesRepository {
	create(
		release: { data: Release; cover: File },
		songs: { data: Song; audio: File }[]
	): Promise<INewReleaseSucc>
	edit(release: { data: Release; cover?: File }, songs: Song[]): Promise<boolean>
}
