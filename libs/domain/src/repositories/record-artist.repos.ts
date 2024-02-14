import { ArtistProfileID, GetShortRecordDTO, IArtistName, RecordID } from "Shared"

export interface RecordArtistRepository {
	addArtists(artists: ArtistProfileID[], record: RecordID): Promise<boolean>
	deleteArtists(artists: ArtistProfileID[], record: RecordID): Promise<boolean>
	findRecordsByArtist(id: ArtistProfileID): Promise<GetShortRecordDTO[]>
	getArtistsNamesOfRecord(id: RecordID): Promise<IArtistName[]>
}
