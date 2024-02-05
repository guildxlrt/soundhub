import axios from "axios"
import { SongsRepository } from "Domain"
import { GetSongDTO, ErrorHandler, SongID, ReleaseID, ArtistProfileID, GenreType } from "Shared"
import { apiUriRequest, apiUrlPath, apiUrlRoot } from "../../assets"

export class SongsImplement implements SongsRepository {
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
