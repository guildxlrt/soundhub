import { GenreType, ArtistProfileID, ReleaseID, GetSongDTO, SongID } from "Shared"
import { Song } from "../entities"

export interface SongsRepository {
	get(id: SongID): Promise<GetSongDTO>
	findManyByRelease(id: ReleaseID): Promise<GetSongDTO[]>
	findManyByArtist(id: ArtistProfileID): Promise<GetSongDTO[]>
	findManyByReleaseGenre(genre: GenreType): Promise<GetSongDTO[]>
}

export interface ExtBackSongsRepos {
	update(data: Song): Promise<boolean>
}
export interface ExtFrontSongsRepos {}

export interface SongsBackendRepos extends SongsRepository, ExtBackSongsRepos {}

export interface SongsFrontendRepos extends SongsRepository, ExtFrontSongsRepos {}
