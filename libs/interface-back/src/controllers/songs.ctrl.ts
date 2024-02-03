import { SongsImplement } from "Infra-backend"
import {
	ExpressRequest,
	ExpressResponse,
	ErrorMsg,
	ResponseDTO,
	htmlError,
	GenreType,
} from "Shared"
import {
	FindSongsByReleaseGenreUsecase,
	FindSongsByReleaseUsecase,
	GenreUsecaseParams,
	GetSongUsecase,
	IDUsecaseParams,
	SongsService,
} from "Application"
import { ApiErrorHandler, ISongsCtrl } from "../assets"

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
			return new ApiErrorHandler().reply(error, res)
		}
	}

	async findMany(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

		const artistID = req.query?.["artist"] as string
		const releaseID = req.query?.["release"] as string
		const releaseGenre = req.query?.["genre"] as string

		if (artistID) {
			try {
				const params = new IDUsecaseParams(artistID)

				const getSong = new FindSongsByReleaseUsecase(this.songsService)
				const { data, error } = await getSong.execute(params)

				if (error) throw error
				if (!data) throw ErrorMsg.htmlError(htmlError[500])

				const reponse = new ResponseDTO(data)
				return res.status(200).send(reponse)
			} catch (error) {
				return new ApiErrorHandler().reply(error, res)
			}
		}

		if (releaseID) {
			try {
				const params = new IDUsecaseParams(releaseID)

				const getSong = new FindSongsByReleaseUsecase(this.songsService)
				const { data, error } = await getSong.execute(params)

				if (error) throw error
				if (!data) throw ErrorMsg.htmlError(htmlError[500])

				const reponse = new ResponseDTO(data)
				return res.status(200).send(reponse)
			} catch (error) {
				return new ApiErrorHandler().reply(error, res)
			}
		}
		if (releaseGenre) {
			try {
				if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

				const genre = req.params["genre"] as GenreType
				const params = new GenreUsecaseParams(genre)

				const getSong = new FindSongsByReleaseGenreUsecase(this.songsService)
				const { data, error } = await getSong.execute(params)

				if (error) throw error
				if (!data) throw ErrorMsg.htmlError(htmlError[500])

				const reponse = new ResponseDTO(data)
				return res.status(200).send(reponse)
			} catch (error) {
				return new ApiErrorHandler().reply(error, res)
			}
		}

		return res.status(400).end()
	}
}
