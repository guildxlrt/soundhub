import { GenreType, ArtistProfileID, ReleaseID, GetSongDTO, SongID } from "Shared"
import { RawFile, Song } from "../entities"

export interface SongsRepository {
	add(song: unknown): Promise<boolean>
	edit(data: unknown): Promise<boolean>
	delete(id: SongID): Promise<boolean>

	get(id: SongID): Promise<GetSongDTO>
	findManyByRelease(id: ReleaseID): Promise<GetSongDTO[]>
	findSongsInArtistReleases(id: ArtistProfileID): Promise<GetSongDTO[]>
	findManyByReleaseGenre(genre: GenreType): Promise<GetSongDTO[]>
}

export interface ExtBackSongsRepos {
	getEditability(id: number): Promise<boolean>
	getAudioPath(releaseID: ReleaseID): Promise<string | null | undefined>
	getReleaseID(id: SongID): Promise<number | undefined>
}
export interface ExtFrontSongsRepos {}

export interface SongsBackendRepos extends SongsRepository, ExtBackSongsRepos {
	add(song: Song): Promise<boolean>
	edit(data: Song): Promise<boolean>
}

export interface SongsFrontendRepos extends SongsRepository, ExtFrontSongsRepos {
	add(song: { data: Song; audio: RawFile }): Promise<boolean>
	edit(song: { data: Song; audio: RawFile }): Promise<boolean>
}
