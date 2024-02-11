import axios from "axios"
import { RawFile, Song, SongsRepository } from "Domain"
import { GetSongDTO, ErrorHandler, SongID, ReleaseID, ArtistProfileID, GenreType } from "Shared"
import { NewFormData, apiUriRequest, apiUrlPath, apiUrlRoot } from "../../assets"

export class SongsImplement implements SongsRepository {
	async add(song: { data: Song; audio: RawFile }): Promise<boolean> {
		try {
			const formData = new FormData()
			NewFormData.fromFile(formData, song.audio, "audio")
			NewFormData.fromObject(formData, song.data, "data")

			return await axios({
				method: "post",
				url: `${apiUrlRoot + apiUrlPath.songs.add}`,
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

			return await axios({
				method: "put",
				url: `${apiUrlRoot + apiUrlPath.songs.edit + id}`,
				withCredentials: true,
				data: formData,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async delete(id: SongID): Promise<boolean> {
		try {
			return await axios({
				method: "delete",
				url: `${apiUrlRoot + apiUrlPath.songs.delete + id}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async get(id: SongID): Promise<GetSongDTO> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.songs.get + id}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findManyByRelease(id: ReleaseID): Promise<GetSongDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.search + apiUriRequest.releaseID + id}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findManyByReleaseGenre(genre: GenreType): Promise<GetSongDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.search + apiUriRequest.releaseGenre + genre}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findManyByArtist(id: ArtistProfileID): Promise<GetSongDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.search + apiUriRequest.artistID + id}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
