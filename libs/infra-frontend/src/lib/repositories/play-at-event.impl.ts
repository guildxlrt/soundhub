import axios from "axios"
import { apiUriQuery, apiUrlPath, apiUrlRoot } from "../../assets"
import { GetEventShortDTO, ErrorHandler, GenreType, EventID } from "Shared"
import { PlayAtEventFrontendRepos } from "Domain"

export class PlayAtEventImplement implements PlayAtEventFrontendRepos {
	async addArtists(input: { artists: number[]; event: number }): Promise<boolean> {
		try {
			const { artists, event } = input

			const url: string = apiUrlRoot + apiUrlPath.songs.add

			return await axios({
				method: "post",
				url: url,
				withCredentials: true,
				data: { artists: artists, event: event },
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async removeArtists(input: { artists: number[]; event: number }): Promise<boolean> {
		try {
			const { artists, event } = input

			const url: string = apiUrlRoot + apiUrlPath.songs.add

			return await axios({
				method: "delete",
				url: url,
				withCredentials: true,
				data: { artists: artists, event: event },
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async search(artistID: EventID, genre: GenreType): Promise<GetEventShortDTO[]> {
		try {
			const url: string =
				apiUrlRoot +
				apiUrlPath.search +
				apiUriQuery.artistID +
				artistID +
				apiUriQuery.artistGenre +
				genre

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
