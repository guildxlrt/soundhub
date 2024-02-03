import axios from "axios"
import { SongsRepository } from "Domain"
import {
	SongDTO,
	apiUrlRoot,
	apiUrlPath,
	apiUrlEndpt,
	ErrorHandler,
	SongID,
	ReleaseID,
} from "Shared"

export class SongsImplement implements SongsRepository {
	async get(id: SongID): Promise<SongDTO> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.songs + apiUrlEndpt.songs.oneByID + id}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findByRelease(id: ReleaseID): Promise<SongDTO[]> {
		try {
			return await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.songs + apiUrlEndpt.songs.oneByID + id}`,
				withCredentials: true,
			})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
