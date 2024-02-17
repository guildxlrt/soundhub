import { ArtistProfileID, GetShortRecordDTO, IArtistName, RecordID } from "Shared"

export interface RecordArtistRepository {
	addArtists(data: { artists: ArtistProfileID[]; record: RecordID }): Promise<boolean>
	removeArtists(data: { artists: ArtistProfileID[]; record: RecordID }): Promise<boolean>
	search(artistID: ArtistProfileID): Promise<GetShortRecordDTO[]>
}

export interface ExtBackRecordArtistRepos {
	getArtistsNames(id: RecordID): Promise<IArtistName[]>
	checkRights(id: number, authID: number): Promise<boolean>
}
export interface ExtFrontRecordArtistRepos {}

export interface RecordArtistBackendRepos
	extends RecordArtistRepository,
		ExtBackRecordArtistRepos {}

export interface RecordArtistFrontendRepos
	extends RecordArtistRepository,
		ExtFrontRecordArtistRepos {}
