import { ArtistProfileID, GetShortReleaseDTO, IArtistName, SongID } from "Shared"

export interface SongFeatRepository {
	addArtists(artists: ArtistProfileID[], songID: SongID): Promise<boolean>
	deleteArtists(artists: ArtistProfileID[], songID: SongID): Promise<boolean>

	findSongsByArtistFeats(id: ArtistProfileID): Promise<GetShortReleaseDTO[]>
	getArtistsNamesOfSong(id: SongID): Promise<IArtistName[]>
}
