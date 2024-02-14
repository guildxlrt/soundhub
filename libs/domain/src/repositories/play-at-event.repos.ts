import {
	EventID,
	ArtistProfileID,
	IGetEventShortSuccess,
	GenreType,
	GetEventShortDTO,
} from "Shared"

export interface PlayAtEventRepository {
	addArtists(artists: ArtistProfileID[], event: EventID): Promise<boolean>
	deleteArtists(artists: ArtistProfileID[], event: EventID): Promise<boolean>

	findEventsByArtist(id: EventID): Promise<unknown[]>
	findEventsByArtistGenre(genre: GenreType): Promise<unknown[]>
}

export interface PlayAtEventBackendRepos extends PlayAtEventRepository {
	findEventsByArtist(id: EventID): Promise<IGetEventShortSuccess[]>
	findEventsByArtistGenre(genre: GenreType): Promise<IGetEventShortSuccess[]>
}
export interface PlayAtEventFrontendRepos extends PlayAtEventRepository {
	findEventsByArtist(id: EventID): Promise<GetEventShortDTO[]>
	findEventsByArtistGenre(genre: GenreType): Promise<GetEventShortDTO[]>
}
