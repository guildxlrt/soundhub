import { ApiErrHandler, ApiRes, ApiRequest, SongsImplement } from "Infra-backend"
import { ErrorMsg, SongDTO, htmlError } from "Shared"
import { GetSongUsecase, IDParamsAdapter, SongsService } from "Application"
import { ISongsCtrl } from "../assets"

export class SongsController implements ISongsCtrl {
	private songsImplement = new SongsImplement()
	private songsService = new SongsService(this.songsImplement)

	async get(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: htmlError[405].message })

			const id = Number(req.params["id"])
			const getSong = new GetSongUsecase(this.songsService)
			const { data, error } = await getSong.execute(new IDParamsAdapter(id))
			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			// Return infos
			return res.status(200).send(new SongDTO(data))
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}
}
