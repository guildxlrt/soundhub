import { GetSongInputDTO } from "Dto"
import { ISongsController } from "../assets"
import { errorMsg, ApiRequest, ApiReply } from "Shared-utils"
import { GetSongUsecase } from "Interactors"
import { databaseServices } from "Infra-backend"
import { errHandler } from "../assets/error-handler"

export class SongsController implements ISongsController {
	async get(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: errorMsg.e405 })

		try {
			const inputs: GetSongInputDTO = req.body as GetSongInputDTO
			const getSong = new GetSongUsecase(databaseServices)
			const { data, error } = await getSong.execute(inputs)
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			errHandler(error, res)
		}
	}
}
