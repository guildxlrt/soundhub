import { ArtistProfileID, GetShortReleaseDTO, SongID } from "Shared"

export interface SongFeatRepository {
	addArtists(artists: ArtistProfileID[], songID: SongID): Promise<boolean>
	deleteArtists(artists: ArtistProfileID[], songID: SongID): Promise<boolean>

	findReleasesByArtistFeats(id: ArtistProfileID): Promise<GetShortReleaseDTO[]>
}
