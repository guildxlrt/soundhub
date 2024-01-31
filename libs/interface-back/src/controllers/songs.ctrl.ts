import { ApiErrHandler, ApiRes, ApiRequest, SongsImplement } from "Infra-backend"
import { ErrorMsg, ReplyDTO, htmlError } from "Shared"
import {
	FindSongsByReleaseUsecase,
	GetSongUsecase,
	IDParamsAdapter,
	SongsService,
} from "Application"
import { ISongsCtrl } from "../assets"

export class SongsController implements ISongsCtrl {
	private songsImplement = new SongsImplement()
	private songsService = new SongsService(this.songsImplement)

	async get(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const id = Number(req.params["id"])
			const params = new IDParamsAdapter(id)

			const getSong = new GetSongUsecase(this.songsService)
			const { data, error } = await getSong.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ReplyDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async findByRelease(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const id = Number(req.params["id"])
			const params = new IDParamsAdapter(id)

			const getSong = new FindSongsByReleaseUsecase(this.songsService)
			const { data, error } = await getSong.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ReplyDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}
}
