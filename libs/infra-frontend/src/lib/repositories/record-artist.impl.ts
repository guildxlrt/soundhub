import axios from "axios"
import { apiUriQuery, apiUrlPath, apiUrlRoot } from "../../assets"
import { ErrorHandler, RecordID, ArtistProfileID, GetShortRecordDTO } from "Shared"
import { RecordArtistFrontendRepos } from "Domain"

export class RecordArtistImplement implements RecordArtistFrontendRepos {
	async addArtists(data: { artists: ArtistProfileID[]; record: RecordID }): Promise<boolean> {
		try {
			const { artists, record } = data

			const url: string = apiUrlRoot + apiUrlPath.songs.add

			return await axios({
				method: "post",
				url: url,
				withCredentials: true,
				data: { artists: artists, record: record },
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async removeArtists(data: { artists: ArtistProfileID[]; record: RecordID }): Promise<boolean> {
		try {
			const { artists, record } = data

			const url: string = apiUrlRoot + apiUrlPath.songs.add

			return await axios({
				method: "delete",
				url: url,
				withCredentials: true,
				data: { artists: artists, record: record },
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async search(artistID: ArtistProfileID, recordID: RecordID): Promise<GetShortRecordDTO[]> {
		try {
			const url: string =
				apiUrlRoot +
				apiUrlPath.search +
				apiUriQuery.artistID +
				artistID +
				apiUriQuery.recordID +
				recordID

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
