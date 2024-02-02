import { ApiErrHandler, SongsImplement } from "Infra-backend"
import { ExpressRequest, ExpressResponse, ErrorMsg, ResponseDTO, htmlError } from "Shared"
import {
	FindSongsByReleaseUsecase,
	GetSongUsecase,
	IDUsecaseParams,
	SongsService,
} from "Application"
import { ISongsCtrl } from "../assets"

export class SongsController implements ISongsCtrl {
	private songsImplement = new SongsImplement()
	private songsService = new SongsService(this.songsImplement)

	async get(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const id = req.params["id"]
			const params = new IDUsecaseParams(id)

			const getSong = new GetSongUsecase(this.songsService)
			const { data, error } = await getSong.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async findByRelease(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const id = req.params["id"]
			const params = new IDUsecaseParams(id)

			const getSong = new FindSongsByReleaseUsecase(this.songsService)
			const { data, error } = await getSong.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}
}
