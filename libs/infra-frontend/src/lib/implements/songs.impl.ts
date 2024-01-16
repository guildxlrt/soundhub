import axios from "axios"
import { Response } from "../../assets"
import { EntityId, SongsRepository, ISongSucc, apiRoot, apiPath, apiEndpts, ErrorMsg } from "Shared"

export class SongsImplement implements SongsRepository {
	async get(id: EntityId): Promise<Response<ISongSucc>> {
		try {
			return (await axios({
				method: "get",
				url: `${apiRoot + apiPath.songs + apiEndpts.songs.oneById + id}`,
				withCredentials: true,
			})) as Response<ISongSucc>
		} catch (error) {
			return new Response<ISongSucc>(undefined, new ErrorMsg(undefined, "Error Calling API"))
		}
	}
}
