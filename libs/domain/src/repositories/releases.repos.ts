import { ProfileID, GenreType, GetReleaseDTO, ReleaseShortDTO, ReleaseID } from "Shared"
import { RawFile, Release, Song } from "Domain"

export interface ReleasesRepository {
	create(release: unknown, songs: unknown[]): Promise<boolean>
	edit(release: unknown, songs?: unknown[]): Promise<boolean>
	setPrivStatus(id: ReleaseID, isPublic?: boolean): Promise<boolean>
	get(id: ReleaseID): Promise<GetReleaseDTO>
	getAll(): Promise<ReleaseShortDTO[]>
	findManyByArtist(id: ProfileID): Promise<ReleaseShortDTO[]>
	findManyByGenre(genre: GenreType): Promise<ReleaseShortDTO[]>
	findManyByDate(date: Date): Promise<ReleaseShortDTO[]>
}

export interface ExtBackReleasesRepos {
	getOwner(id: number): Promise<number | undefined>
	getPrivStatus(id: ReleaseID): Promise<boolean>
	getCoverPath(releaseID: ReleaseID): Promise<string | null | undefined>
	setCoverPath(path: string | null, id: ReleaseID): Promise<boolean>
}
export interface ExtFrontReleasesRepos {}

export interface ReleasesBackendRepos extends ReleasesRepository, ExtBackReleasesRepos {
	setPrivStatus(id: ReleaseID, isPublic: boolean): Promise<boolean>
	create(release: { data: Release }, songs: { data: Song }[]): Promise<boolean>
	edit(release: { data: Release }): Promise<boolean>
}

export interface ReleasesFrontendRepos extends ReleasesRepository, ExtFrontReleasesRepos {
	create(
		release: { data: Release; cover: RawFile },
		songs: { data: Song; audio: RawFile }[]
	): Promise<boolean>
	edit(release: { data: Release; cover?: RawFile }, songs: Song[]): Promise<boolean>
}
