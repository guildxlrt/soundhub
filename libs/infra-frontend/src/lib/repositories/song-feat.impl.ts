import axios from "axios"
import { apiUriQuery, apiUrlPath, apiUrlRoot } from "../../assets"
import { ErrorHandler, GetShortRecordDTO, ArtistProfileID, GetSongDTO } from "Shared"
import { SongFeatFrontendRepos } from "Domain"

export class SongFeatImplement implements SongFeatFrontendRepos {
	async addArtists(input: { song: number; artists: number[] }): Promise<boolean> {
		try {
			const { song, artists } = input

			const url: string = apiUrlRoot + apiUrlPath.songs.add + song

			return await axios({
				method: "post",
				url: url,
				withCredentials: true,
				data: { song: song, artists: artists },
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async removeArtists(input: { song: number; artists: number[] }): Promise<boolean> {
		try {
			const { song, artists } = input
			const url: string = apiUrlRoot + apiUrlPath.songs.remove + song

			return await axios({
				method: "delete",
				url: url,
				withCredentials: true,
				data: { song: song, artists: artists },
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async search(artistFeatsID: ArtistProfileID): Promise<GetSongDTO[]> {
		try {
			const url: string =
				apiUrlRoot + apiUrlPath.search + apiUriQuery.artistFeatsID + artistFeatsID

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
