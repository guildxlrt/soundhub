import { ProfileID, GenreType, GetReleaseDTO, ReleaseShortDTO, ReleaseID } from "Shared"
import { File, Release, Song } from "Domain"

export interface ReleasesRepository {
	create(release: unknown, songs: unknown[]): Promise<boolean>
	edit(release: unknown, songs?: unknown[]): Promise<boolean>
	setPrivStatus(id: ReleaseID, isPublic?: boolean): Promise<boolean>
	get(data: ReleaseID): Promise<GetReleaseDTO>
	getAll(): Promise<ReleaseShortDTO[]>
	findManyByArtist(data: ProfileID): Promise<ReleaseShortDTO[]>
	findManyByGenre(genre: GenreType): Promise<ReleaseShortDTO[]>
}

export interface ReleasesAddBackRepos {
	getOwner(id: number): Promise<number | undefined>
	getPrivStatus(id: ReleaseID): Promise<boolean>
	getCoverPath(releaseID: ReleaseID): Promise<string | null | undefined>
	setCoverPath(path: string | null, id: ReleaseID): Promise<boolean>
}
export interface ReleasesAddFrontRepos {}

export interface ReleasesBackendRepos extends ReleasesRepository, ReleasesAddBackRepos {
	create(release: { data: Release }, songs: { data: Song }[]): Promise<boolean>
	edit(release: { data: Release }): Promise<boolean>
	setPrivStatus(id: ReleaseID, isPublic: boolean): Promise<boolean>
}

export interface ReleasesFrontendRepos extends ReleasesRepository {
	create(
		release: { data: Release; cover: File },
		songs: { data: Song; audio: File }[]
	): Promise<boolean>
	edit(release: { data: Release; cover?: File }, songs: Song[]): Promise<boolean>
}
