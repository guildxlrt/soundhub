import { ISongSucc } from "Shared"
import { Song } from "../entities"

export interface SongsRepository {
	get(data: unknown): Promise<ISongSucc>
}

export interface SongsAddBackRepos {
	update(data: Song): Promise<void>
}
export interface SongsAddFrontRepos {}

export interface SongsBackendRepos extends SongsRepository, SongsAddBackRepos {}

export interface SongsFrontendRepos extends SongsRepository {}
