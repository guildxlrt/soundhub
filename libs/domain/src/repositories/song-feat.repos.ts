import { ArtistProfileID, GetSongDTO, IArtistName, SongID } from "Shared"

export interface SongFeatRepository {
	addArtists(input: { song: number; artists: number[] }): Promise<boolean>
	removeArtists(input: { song: number; artists: number[] }): Promise<boolean>

	search(id: ArtistProfileID): Promise<GetSongDTO[]>
}

export interface ExtBackSongFeatRepos {
	getArtistsNames(id: SongID): Promise<IArtistName[]>

	checkRights(id: number, createdBy: number): Promise<boolean>
}
export interface ExtFrontSongFeatRepos {}

export interface SongFeatBackendRepos extends SongFeatRepository, ExtBackSongFeatRepos {}

export interface SongFeatFrontendRepos extends SongFeatRepository, ExtFrontSongFeatRepos {}
