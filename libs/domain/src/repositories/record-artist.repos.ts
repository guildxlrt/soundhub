import { ArtistProfileID, GetShortRecordDTO, IArtistName, RecordID } from "Shared"

export interface RecordArtistRepository {
	addArtists(data: { artists: ArtistProfileID[]; record: RecordID }): Promise<boolean>
	removeArtists(data: { artists: ArtistProfileID[]; record: RecordID }): Promise<boolean>
	findRecordsByArtist(id: ArtistProfileID): Promise<GetShortRecordDTO[]>
	getArtistsNamesOfRecord(id: RecordID): Promise<IArtistName[]>
}

export interface ExtBackRecordArtistRepos {
	checkRights(id: number, authID: number): Promise<boolean>
}
export interface ExtFrontRecordArtistRepos {}
