import { ArtistProfileID, GetShortReleaseDTO, ReleaseID } from "Shared"

export interface ReleaseArtistRepository {
	addArtists(artists: ArtistProfileID[], release: ReleaseID): Promise<boolean>
	deleteArtists(artists: ArtistProfileID[], release: ReleaseID): Promise<boolean>
	findReleasesByArtist(id: ArtistProfileID): Promise<GetShortReleaseDTO[]>
}
