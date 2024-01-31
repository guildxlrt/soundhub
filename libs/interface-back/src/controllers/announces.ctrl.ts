import {
	AnnouncesImplement,
	ApiErrHandler,
	ApiRequest,
	ApiRes,
	StorageImplement,
} from "Infra-backend"
import { File } from "Domain"
import {
	CreateAnnounceUsecase,
	DeleteAnnounceUsecase,
	FindAnnouncesByArtistUsecase,
	GetAllAnnouncesUsecase,
	GetAnnounceUsecase,
	EditAnnounceUsecase,
	DeleteAnnounceParamsAdapter,
	IDParamsAdapter,
	AnnouncesService,
	StorageService,
	EditAnnounceParamsAdapter,
	NewAnnounceParamsAdapter,
} from "Application"
import {
	htmlError,
	IMAGE_MIME_TYPES,
	validators,
	ReplyDTO,
	CreateAnnounceDTO,
	EditAnnounceDTO,
	ErrorMsg,
} from "Shared"
import { IAnnoncesCtrl } from "../assets"

export class AnnoncesController implements IAnnoncesCtrl {
	private storageImplement = new StorageImplement()
	private storageService = new StorageService(this.storageImplement)
	private announcesImplement = new AnnouncesImplement()
	private announcesService = new AnnouncesService(this.announcesImplement)

	async create(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "POST") throw ErrorMsg.htmlError(htmlError[405])

			const dto = req.body as CreateAnnounceDTO
			const owner = req.auth?.profileID as number
			const file = req.image as File

			// OPERATORS
			// file
			if (file) validators.file(file, IMAGE_MIME_TYPES)

			// Saving Profile
			const createAnnounce = new CreateAnnounceUsecase(
				this.announcesService,
				this.storageService
			)
			const params = NewAnnounceParamsAdapter.fromDto(dto, owner, file)

			const { data, error } = await createAnnounce.execute(params)
			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ReplyDTO(data)
			return res.status(202).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async edit(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "POST") throw ErrorMsg.htmlError(htmlError[405])

			const file = req.image as File
			const owner = req.auth?.profileID as number

			const dto = req.body as EditAnnounceDTO

			// Operators
			// ... doing some heathcheck

			// Saving Profile
			const EditAnnounce = new EditAnnounceUsecase(this.announcesService, this.storageService)
			const params = EditAnnounceParamsAdapter.fromDto(dto, owner, file)

			const { data, error } = await EditAnnounce.execute(params)
			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ReplyDTO(data)
			return res.status(202).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async delete(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "DELETE") throw ErrorMsg.htmlError(htmlError[405])
			const user = req.auth?.profileID as number
			const id = Number(req.params["id"])

			// Operators
			// ... doing some heathcheck

			// Saving Profile
			const deleteAnnounce = new DeleteAnnounceUsecase(
				this.announcesService,
				this.storageService
			)
			const params = DeleteAnnounceParamsAdapter.fromDtoBackend(id, user)

			const { data, error } = await deleteAnnounce.execute(params)
			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ReplyDTO(data)
			return res.status(202).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async get(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const id = Number(req.params["id"])
			const getAnnounce = new GetAnnounceUsecase(this.announcesService)
			const params = new IDParamsAdapter(id)

			const { data, error } = await getAnnounce.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ReplyDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async getAll(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const getAllAnnounces = new GetAllAnnouncesUsecase(this.announcesService)
			const { data, error } = await getAllAnnounces.execute()

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ReplyDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}

	async findManyByArtist(req: ApiRequest, res: ApiRes): Promise<ApiRes> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const id = Number(req.params["id"])
			const findAnnouncesByArtist = new FindAnnouncesByArtistUsecase(this.announcesService)
			const params = new IDParamsAdapter(id)

			const { data, error } = await findAnnouncesByArtist.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ReplyDTO(data)
			return res.status(200).send(reponse)
		} catch (error) {
			return new ApiErrHandler().reply(error, res)
		}
	}
}
