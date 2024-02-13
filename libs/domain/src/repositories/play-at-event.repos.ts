import { EventID, ArtistProfileID, IGetEventShortSuccess, GenreType } from "Shared"

export interface PlayAtEventRepository {
	addArtists(artists: ArtistProfileID[], event: EventID): Promise<boolean>
	deleteArtists(artists: ArtistProfileID[], event: EventID): Promise<boolean>

	findEventsByArtist(id: EventID): Promise<IGetEventShortSuccess[]>
	findEventsByArtistGenre(genre: GenreType): Promise<IGetEventShortSuccess[]>
}
