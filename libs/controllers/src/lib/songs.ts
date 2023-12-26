import { GetSongInputDTO } from "Dto"
import { ApiRequest, ApiReply, ISongsController } from "../assets"
import { apiError } from "../assets"
import { GetSongUsecase } from "Interactors"
import { databaseServices } from "Infra-backend"

export class SongsController implements ISongsController {
	async get(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: apiError.e405.msg })

		try {
			const inputs: GetSongInputDTO = req.body as GetSongInputDTO
			const getSong = new GetSongUsecase(databaseServices)
			const { data, error } = await getSong.execute(inputs)

			// Return infos
			if (error) res.status(error.status).send({ error: error.message })
			return res.status(200).send(data)
		} catch (error) {
			//
		}
	}
}
