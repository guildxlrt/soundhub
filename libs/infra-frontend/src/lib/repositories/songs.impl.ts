import axios from "axios"
import { RawFile, Song, SongsFrontendRepos } from "Domain"
import {
	GetSongDTO,
	ErrorHandler,
	SongID,
	RecordID,
	ArtistProfileID,
	GenreType,
	GetFullSongDTO,
} from "Shared"
import { NewFormData, apiUriQuery, apiUrlPath, apiUrlRoot } from "../../assets"

export class SongsImplement implements SongsFrontendRepos {
	async add(song: { data: Song; audio: RawFile }): Promise<boolean> {
		try {
			const formData = new FormData()
			NewFormData.fromFile(formData, song.audio, "audio")
			NewFormData.fromObject(formData, song.data, "data")

			const url: string = apiUrlRoot + apiUrlPath.songs.add

			return await axios({
				method: "post",
				url: url,
				withCredentials: true,
				data: formData,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async edit(song: { data: Song; audio: RawFile }): Promise<boolean> {
		try {
			const { id } = song.data

			const formData = new FormData()
			NewFormData.fromFile(formData, song.audio, "audio")
			NewFormData.fromObject(formData, song.data, "data")

			const url: string = apiUrlRoot + apiUrlPath.songs.edit + id

			return await axios({
				method: "put",
				url: url,
				withCredentials: true,
				data: formData,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async delete(id: SongID): Promise<boolean> {
		try {
			const url: string = apiUrlRoot + apiUrlPath.songs.remove + id

			return await axios({
				method: "delete",
				url: url,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async get(id: SongID): Promise<GetFullSongDTO> {
		try {
			const url: string = apiUrlRoot + apiUrlPath.songs.get + id

			return await axios({
				method: "get",
				url: url,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async search(
		recordID: RecordID,
		artistID: ArtistProfileID,
		genre: GenreType
	): Promise<GetSongDTO[]> {
		try {
			const url: string =
				apiUrlRoot +
				apiUrlPath.search +
				apiUriQuery.recordID +
				recordID +
				apiUriQuery.recordGenre +
				genre +
				apiUriQuery.artistID +
				artistID

			return await axios({
				method: "get",
				url: url,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
