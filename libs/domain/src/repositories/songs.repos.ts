import {
	GenreType,
	ArtistProfileID,
	RecordID,
	GetSongDTO,
	SongID,
	GetFullSongDTO,
	IGetFullSongSuccess,
} from "Shared"
import { RawFile, Song } from "../entities"

export interface SongsRepository {
	add(song: unknown): Promise<boolean>
	edit(data: unknown): Promise<boolean>
	delete(id: SongID): Promise<boolean>

	get(id: SongID): Promise<unknown>
	findByRecord(id: RecordID): Promise<GetSongDTO[]>
	findByArtistRecords(id: ArtistProfileID): Promise<GetSongDTO[]>
	findByRecordGenre(genre: GenreType): Promise<GetSongDTO[]>
}

export interface ExtBackSongsRepos {
	checkRights(id: number, createdBy: number): Promise<boolean>
	getAudioPath(recordID: RecordID): Promise<string | null | undefined>
	getRecordID(id: SongID): Promise<number | undefined>
}
export interface ExtFrontSongsRepos {}

export interface SongsBackendRepos extends SongsRepository, ExtBackSongsRepos {
	add(data: { song: Song; artists: ArtistProfileID[] }): Promise<boolean>
	edit(data: Song): Promise<boolean>
	get(id: SongID): Promise<IGetFullSongSuccess>
}

export interface SongsFrontendRepos extends SongsRepository, ExtFrontSongsRepos {
	add(song: { data: Song; audio: RawFile }): Promise<boolean>
	edit(song: { data: Song; audio: RawFile }): Promise<boolean>
	get(id: SongID): Promise<GetFullSongDTO>
}
