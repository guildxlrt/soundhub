import { GenreType, ProfileID, ReleaseID, SongDTO, SongID } from "Shared"
import { Song } from "../entities"

export interface SongsRepository {
	get(id: SongID): Promise<SongDTO>
	findByRelease(id: ReleaseID): Promise<SongDTO[]>
	findByArtist(id: ProfileID): Promise<SongDTO[]>
	findByReleaseGenre(genre: GenreType): Promise<SongDTO[]>
}

export interface ExtBackSongsRepos {
	update(data: Song): Promise<boolean>
}
export interface ExtFrontSongsRepos {}

export interface SongsBackendRepos extends SongsRepository, ExtBackSongsRepos {}

export interface SongsFrontendRepos extends SongsRepository, ExtFrontSongsRepos {}
