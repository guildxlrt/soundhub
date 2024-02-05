import { SongsImplement } from "Infra-backend"
import { ExpressRequest, ExpressResponse, ErrorMsg, ResponseDTO, htmlError } from "Shared"
import { GetSongUsecase, IDUsecaseParams, SongsService } from "Application"
import { ApiErrorHandler, ISongsCtrl } from "../assets"

export class SongsController implements ISongsCtrl {
	async get(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const id = req.params["id"]
			const params = new IDUsecaseParams(id)

			// services
			const songsImplement = new SongsImplement()
			const songsService = new SongsService(songsImplement)

			// Calling database
			const getSong = new GetSongUsecase(songsService)
			const { data, error } = await getSong.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data, error)
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}
}
