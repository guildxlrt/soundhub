import {
	ArtistProfileID,
	GenreType,
	GetShortReleaseDTO,
	ReleaseID,
	GetFullReleaseDTO,
	IGetFullReleaseSuccess,
	ReleaseType,
} from "Shared"
import { RawFile, Release, Song } from "Domain"

export interface ReleasesRepository {
	create(release: unknown, songs: unknown[]): Promise<boolean>
	edit(release: unknown, songs?: unknown[]): Promise<boolean>
	setPublicStatus(id: ReleaseID, isPublic?: boolean): Promise<boolean>
	get(id: ReleaseID): Promise<unknown>
	getAll(): Promise<GetShortReleaseDTO[]>
	findManyByArtist(id: ArtistProfileID): Promise<GetShortReleaseDTO[]>
	findManyByArtistFeats(id: ArtistProfileID): Promise<GetShortReleaseDTO[]>
	findManyByGenre(genre: GenreType): Promise<GetShortReleaseDTO[]>
	findManyByDate(date: Date): Promise<GetShortReleaseDTO[]>
	findManyByReleaseType(type: ReleaseType): Promise<GetShortReleaseDTO[]>
}

export interface ExtBackReleasesRepos {
	getOwner(id: number): Promise<number | undefined>
	getPublicStatus(id: ReleaseID): Promise<boolean>
	getCoverPath(releaseID: ReleaseID): Promise<string | null | undefined>
	setCoverPath(path: string | null, id: ReleaseID): Promise<boolean>
}
export interface ExtFrontReleasesRepos {}

export interface ReleasesBackendRepos extends ReleasesRepository, ExtBackReleasesRepos {
	create(release: { data: Release }, songs: { data: Song }[]): Promise<boolean>
	edit(release: { data: Release }): Promise<boolean>
	setPublicStatus(id: ReleaseID, isPublic: boolean): Promise<boolean>
	get(id: ReleaseID): Promise<IGetFullReleaseSuccess>
}

export interface ReleasesFrontendRepos extends ReleasesRepository, ExtFrontReleasesRepos {
	create(
		release: { data: Release; cover: RawFile },
		songs: { data: Song; audio: RawFile }[]
	): Promise<boolean>
	edit(release: { data: Release; cover?: RawFile }, songs: Song[]): Promise<boolean>
	get(id: ReleaseID): Promise<GetFullReleaseDTO>
}
