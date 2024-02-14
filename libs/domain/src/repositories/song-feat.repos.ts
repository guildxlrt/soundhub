import { ArtistProfileID, GetShortRecordDTO, IArtistName, SongID } from "Shared"

export interface SongFeatRepository {
	addArtists(artists: ArtistProfileID[], songID: SongID): Promise<boolean>
	deleteArtists(artists: ArtistProfileID[], songID: SongID): Promise<boolean>

	findSongsByArtistFeats(id: ArtistProfileID): Promise<GetShortRecordDTO[]>
	getArtistsNamesOfSong(id: SongID): Promise<IArtistName[]>
}
