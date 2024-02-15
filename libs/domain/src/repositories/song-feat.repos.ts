import { ArtistProfileID, GetShortRecordDTO, IArtistName, SongID } from "Shared"

export interface SongFeatRepository {
	addArtists(input: { song: number; artists: number[] }): Promise<boolean>
	removeArtists(input: { song: number; artists: number[] }): Promise<boolean>

	findSongsByArtistFeats(id: ArtistProfileID): Promise<GetShortRecordDTO[]>
	getArtistsNamesOfSong(id: SongID): Promise<IArtistName[]>
}

export interface ExtBackSongFeatRepos {
	checkRights(id: number, createdBy: number): Promise<boolean>
}
export interface ExtFrontSongFeatRepos {}

export interface SongFeatBackendRepos extends SongFeatRepository, ExtBackSongFeatRepos {}

export interface SongFeatFrontendRepos extends SongFeatRepository, ExtFrontSongFeatRepos {}
