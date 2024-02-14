import {
	GenreType,
	GetShortReleaseDTO,
	ReleaseID,
	GetFullReleaseDTO,
	IGetFullReleaseSuccess,
	ReleaseType,
	ArtistProfileID,
} from "Shared"
import { RawFile, Release } from "Domain"

export interface ReleasesRepository {
	create(release: unknown): Promise<boolean>
	edit(release: unknown): Promise<boolean>
	delete(id: ReleaseID): Promise<boolean>
	publish(id: ReleaseID): Promise<boolean>
	setPublicStatus(id: ReleaseID, isPublic?: boolean): Promise<boolean>

	get(id: ReleaseID): Promise<unknown>
	getAll(): Promise<GetShortReleaseDTO[]>
	findByGenre(genre: GenreType): Promise<GetShortReleaseDTO[]>
	findByDate(date: Date): Promise<GetShortReleaseDTO[]>
	findByReleaseType(type: ReleaseType): Promise<GetShortReleaseDTO[]>
}

export interface ExtBackReleasesRepos {
	publish(id: ReleaseID): Promise<boolean>
	getEditability(id: number): Promise<boolean>
	getOwner(id: number): Promise<number | undefined>
	getPublicStatus(id: ReleaseID): Promise<boolean>
	getFolderPath(releaseID: ReleaseID): Promise<string | null | undefined>
}
export interface ExtFrontReleasesRepos {}

export interface ReleasesBackendRepos extends ReleasesRepository, ExtBackReleasesRepos {
	create(data: { release: Release; artists: ArtistProfileID[] }): Promise<boolean>
	edit(release: Release): Promise<boolean>
	setPublicStatus(id: ReleaseID, isPublic: boolean): Promise<boolean>
	get(id: ReleaseID): Promise<IGetFullReleaseSuccess>
}

export interface ReleasesFrontendRepos extends ReleasesRepository, ExtFrontReleasesRepos {
	create(release: { data: Release; cover: RawFile }): Promise<boolean>
	edit(release: { data: Release; cover?: RawFile }): Promise<boolean>
	get(id: ReleaseID): Promise<GetFullReleaseDTO>
}
