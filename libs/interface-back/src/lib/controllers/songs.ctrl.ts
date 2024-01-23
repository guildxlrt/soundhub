import { databaseServices } from "Infra-backend"
import { GetSongReplyDTO, apiErrorMsg } from "Shared"
import { GetSongUsecase, IDUsecaseParams } from "Domain"
import { ISongsCtrl, ApiErrHandler, ApiRequest, ApiReply } from "../../assets"

export class SongsController implements ISongsCtrl {
	async get(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: apiErrorMsg.e405 })

			const id = Number(req.params["id"])
			const getSong = new GetSongUsecase(databaseServices)
			const { data, error } = await getSong.execute(new IDUsecaseParams(id))
			if (error) throw error

			// Return infos
			return res.status(200).send(new GetSongReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}
}
