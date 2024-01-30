import { ReleaseID, SongDTO, SongID } from "Shared"
import { Song } from "../entities"

export interface SongsRepository {
	get(data: SongID): Promise<SongDTO>
	findByRelease(id: ReleaseID): Promise<SongDTO[]>
}

export interface SongsAddBackRepos {
	update(data: Song): Promise<boolean>
}
export interface SongsAddFrontRepos {}

export interface SongsBackendRepos extends SongsRepository, SongsAddBackRepos {}

export interface SongsFrontendRepos extends SongsRepository {}
