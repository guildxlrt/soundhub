import axios from "axios"
import { Response } from "../../assets"
import { SongsRepository } from "Domain"
import { EntityID, ISongSucc, apiUrlRoot, apiUrlPath, apiUrlEndpt, ErrorMsg } from "Shared"

export class SongsImplement implements SongsRepository {
	async get(id: EntityID): Promise<Response<ISongSucc>> {
		try {
			return (await axios({
				method: "get",
				url: `${apiUrlRoot + apiUrlPath.songs + apiUrlEndpt.songs.oneByID + id}`,
				withCredentials: true,
			})) as Response<ISongSucc>
		} catch (error) {
			return new Response<ISongSucc>(undefined, new ErrorMsg("Error Calling API"))
		}
	}
}
