import { ISongsController } from "../../assets"
import { GetSongReqDTO, apiErrorMsg } from "Shared"
import { GetSongUsecase } from "Interactors"
import { databaseServices } from "Infra-backend"
import { errHandler, ApiRequest, ApiReply } from "../../assets"

export class SongsController implements ISongsController {
	async get(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: apiErrorMsg.e405 })

		try {
			const inputs: GetSongReqDTO = req.body as GetSongReqDTO
			const getSong = new GetSongUsecase(databaseServices)
			const { data, error } = await getSong.execute(inputs)
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			return errHandler.reply(error, res)
		}
	}
}
