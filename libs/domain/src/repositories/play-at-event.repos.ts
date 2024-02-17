import { EventID, IGetEventShortSuccess, GenreType, GetEventShortDTO } from "Shared"

export interface PlayAtEventRepository {
	addArtists(input: { artists: number[]; event: number }): Promise<boolean>
	removeArtists(input: { artists: number[]; event: number }): Promise<boolean>

	search(id: EventID, genre: GenreType): Promise<unknown[]>
}

export interface ExtBackPlayAtEventRepos {
	checkRights(id: number, authID: number): Promise<boolean>
}
export interface ExtFrontPlayAtEventRepos {}

export interface PlayAtEventBackendRepos extends PlayAtEventRepository {
	search(id: EventID, genre: GenreType): Promise<IGetEventShortSuccess[]>
}
export interface PlayAtEventFrontendRepos extends PlayAtEventRepository {
	search(id: EventID, genre: GenreType): Promise<GetEventShortDTO[]>
}
