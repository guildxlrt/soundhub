import { ReleasesImplement, SongsImplement, StorageImplement } from "Infra-backend"
import { StreamFile } from "Domain"
import {
	CreateReleaseUsecase,
	FindReleasesByArtistUsecase,
	GetAllReleasesUsecase,
	GetReleaseUsecase,
	SetPublicStatusReleaseUsecase,
	EditReleaseUsecase,
	NewReleaseUsecaseParams,
	EditReleaseUsecaseParams,
	SetPublicStatusReleaseUsecaseParams,
	IDUsecaseParams,
	GenreUsecaseParams,
	StorageService,
	ReleasesService,
	DateUsecaseParams,
	FindReleasesByDateUsecase,
	FindReleasesByGenreUsecase,
	SongsService,
	FindReleasesByTypeUsecase,
	FindReleasesByReleaseTypeUsecase,
	FindReleasesByArtistFeatsUsecase,
} from "Application"
import {
	ExpressRequest,
	ExpressResponse,
	EditReleaseDTO,
	htmlError,
	ErrorMsg,
	ResponseDTO,
	ReleaseStatusDTO,
	PostReleaseDTO,
	ReleaseType,
} from "Shared"
import { ApiErrorHandler, IReleasesCtrl } from "../assets"

export class ReleasesController implements IReleasesCtrl {
	private storageImplement = new StorageImplement()
	private storageService = new StorageService(this.storageImplement)
	private releasesImplement = new ReleasesImplement()
	private releasesService = new ReleasesService(this.releasesImplement)
	private songsImplement = new SongsImplement()
	private songsService = new SongsService(this.songsImplement)

	async create(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "POST") throw ErrorMsg.htmlError(htmlError[405])

			const user = req.auth?.profileID as number
			const inputs: PostReleaseDTO = req.body as PostReleaseDTO
			const cover = req.image as StreamFile
			const audioFiles: StreamFile[] = req.songs as StreamFile[]
			const params = NewReleaseUsecaseParams.fromDto(inputs, user, audioFiles, cover)

			// Saving Profile
			const createRelease = new CreateReleaseUsecase(
				this.releasesService,
				this.storageService
			)
			const { data, error } = await createRelease.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrorHandler().reply(error, res)
		}
	}

	async edit(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "DELETE") throw ErrorMsg.htmlError(htmlError[405])

			const inputs: EditReleaseDTO = req.body as EditReleaseDTO
			const user = req.auth?.profileID as number
			const cover = req.image as StreamFile
			const params = EditReleaseUsecaseParams.fromDto(inputs, user, cover)

			// Saving Profile
			const editRelease = new EditReleaseUsecase(
				this.releasesService,
				this.storageService,
				this.songsService
			)
			const { data, error } = await editRelease.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrorHandler().reply(error, res)
		}
	}

	async setPublicStatus(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "PATCH") throw ErrorMsg.htmlError(htmlError[405])

			const user = req.auth?.profileID as number
			const { id }: ReleaseStatusDTO = req.body as ReleaseStatusDTO
			const params = SetPublicStatusReleaseUsecaseParams.fromDtoBackend(id, user)

			// Saving Profile
			const setPublicStatusRelease = new SetPublicStatusReleaseUsecase(this.releasesService)
			const { data, error } = await setPublicStatusRelease.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrorHandler().reply(error, res)
		}
	}

	async get(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const id = req.params["id"]
			const params = new IDUsecaseParams(id)

			const getRelease = new GetReleaseUsecase(this.releasesService)
			const { data, error } = await getRelease.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrorHandler().reply(error, res)
		}
	}

	async getAll(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const getAllReleases = new GetAllReleasesUsecase(this.releasesService)
			const { data, error } = await getAllReleases.execute()

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
		const owner = req.query?.["owner"] as string
		const feats = req.query?.["feats"] as string
		const genre = req.query?.["genre"] as string
		const date = req.query?.["date"] as string
		const releaseType = req.query?.["release-type"] as string

		if (artistID) {
			if (owner) {
				try {
					const params = new IDUsecaseParams(artistID)

					const findReleasesByArtist = new FindReleasesByArtistUsecase(
						this.releasesService
					)
					const { data, error } = await findReleasesByArtist.execute(params)

					if (error) throw error
					if (!data) throw ErrorMsg.htmlError(htmlError[500])

					const reponse = new ResponseDTO(data)
					return res.status(200).send(reponse)
				} catch (error) {
					return new ApiErrorHandler().reply(error, res)
				}
			}
			if (feats) {
				try {
					if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

					const id = req.params["id"]
					const params = new IDUsecaseParams(id)

					const findManyByArtistFeats = new FindReleasesByArtistFeatsUsecase(
						this.releasesService
					)
					const { data, error } = await findManyByArtistFeats.execute(params)

					if (error) throw error
					if (!data) throw ErrorMsg.htmlError(htmlError[500])

					const reponse = new ResponseDTO(data)
					return res.status(200).send(reponse)
				} catch (error) {
					return new ApiErrorHandler().reply(error, res)
				}
			}
		}
		if (genre) {
			try {
				const params = new GenreUsecaseParams(genre)

				const findReleasesByGenre = new FindReleasesByGenreUsecase(this.releasesService)
				const { data, error } = await findReleasesByGenre.execute(params)

				if (error) throw error
				if (!data) throw ErrorMsg.htmlError(htmlError[500])

				const reponse = new ResponseDTO(data)
				return res.status(200).send(reponse)
			} catch (error) {
				return new ApiErrorHandler().reply(error, res)
			}
		}

		if (date) {
			try {
				const params = DateUsecaseParams.fromReqParams(date)

				const findEventsByDate = new FindReleasesByDateUsecase(this.releasesService)
				const { data, error } = await findEventsByDate.execute(params)

				if (error) throw error
				if (!data) throw ErrorMsg.htmlError(htmlError[500])

				const reponse = new ResponseDTO(data)
				return res.status(200).send(reponse)
			} catch (error) {
				return new ApiErrorHandler().reply(error, res)
			}
		}

		if (releaseType) {
			try {
				if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

				const inputs = req.params?.["type"] as ReleaseType
				const params = new FindReleasesByReleaseTypeUsecase(inputs)

				const findEventsByDate = new FindReleasesByTypeUsecase(this.releasesService)
				const { data, error } = await findEventsByDate.execute(params)

				if (error) throw error
				if (!data) throw ErrorMsg.htmlError(htmlError[500])

				const reponse = new ResponseDTO(data)
				return res.status(200).send(reponse)
			} catch (error) {
				return new ApiErrorHandler().reply(error, res)
			}
		}

		return res.status(202).end()
	}
}
