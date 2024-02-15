import { EventID, IGetEventShortSuccess, GenreType, GetEventShortDTO } from "Shared"

export interface PlayAtEventRepository {
	addArtists(input: { artists: number[]; event: number }): Promise<boolean>
	removeArtists(input: { artists: number[]; event: number }): Promise<boolean>

	findEventsByArtist(id: EventID): Promise<unknown[]>
	findEventsByArtistGenre(genre: GenreType): Promise<unknown[]>
}

export interface ExtBackPlayAtEventRepos {
	checkRights(id: number, authID: number): Promise<boolean>
}
export interface ExtFrontPlayAtEventRepos {}

export interface PlayAtEventBackendRepos extends PlayAtEventRepository {
	findEventsByArtist(id: EventID): Promise<IGetEventShortSuccess[]>
	findEventsByArtistGenre(genre: GenreType): Promise<IGetEventShortSuccess[]>
}
export interface PlayAtEventFrontendRepos extends PlayAtEventRepository {
	findEventsByArtist(id: EventID): Promise<GetEventShortDTO[]>
	findEventsByArtistGenre(genre: GenreType): Promise<GetEventShortDTO[]>
}
