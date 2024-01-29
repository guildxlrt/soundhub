import { ApiErrHandler, ApiReply, ApiRequest, databaseRepos } from "Infra-backend"
import { GetSongReplyDTO, htmlError } from "Shared"
import { GetSongUsecase, IDUsecaseParams } from "Application"
import { ISongsCtrl } from "../assets"

export class SongsController implements ISongsCtrl {
	async get(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: htmlError[405].message })

			const id = Number(req.params["id"])
			const getSong = new GetSongUsecase(databaseRepos)
			const { data, error } = await getSong.execute(new IDUsecaseParams(id))
			if (error) throw error

			// Return infos
			return res.status(200).send(new GetSongReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}
}