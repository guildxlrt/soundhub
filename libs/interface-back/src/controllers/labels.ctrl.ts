import {
	CreateLabelUsecase,
	EditLabelUsecaseParams,
	NewLabelUsecaseParams,
	SetStatusLabelUsecaseParams,
	StorageService,
	SetStatusLabelUsecase,
	IDUsecaseParams,
	GetLabelUsecase,
	LabelsService,
} from "Application"
import { LabelsImplement, StorageImplement } from "Infra-backend"
import {
	EditLabelDTO,
	ErrorMsg,
	ExpressRequest,
	ExpressResponse,
	ItemStatusType,
	PostLabelDTO,
	ResponseDTO,
	StatusDTO,
	htmlError,
} from "Shared"
import { ApiErrorHandler, ILabelsCtrl } from "../assets"

export class LabelsController implements ILabelsCtrl {
	async create(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "POST") throw ErrorMsg.htmlError(htmlError[405])

			const dto = req.body as PostLabelDTO
			const authID = req.auth?.authID as number
			const file = req.image as unknown

			// Services
			const labelsImplement = new LabelsImplement()
			const labelsService = new LabelsService(labelsImplement)
			const storageImplement = new StorageImplement()
			const storageService = new StorageService(storageImplement)

			// Calling database
			const createLabel = new CreateLabelUsecase(labelsService, storageService)
			const params = NewLabelUsecaseParams.fromBackend(dto, authID, file)

			const { data, error } = await createLabel.execute(params)
			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data, error)
			return res.status(201).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}
	async edit(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "PUT") throw ErrorMsg.htmlError(htmlError[405])

			const dto = req.body as EditLabelDTO
			const authID = req.auth?.authID as number
			const file = req.image as unknown

			// Services
			const labelsImplement = new LabelsImplement()
			const labelsService = new LabelsService(labelsImplement)
			const storageImplement = new StorageImplement()
			const storageService = new StorageService(storageImplement)

			// Calling database
			const createLabel = new CreateLabelUsecase(labelsService, storageService)
			const params = EditLabelUsecaseParams.fromBackend(dto, authID, file)

			const { data, error } = await createLabel.execute(params)
			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data, error)
			return res.status(201).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}
	async setStatus(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "PATCH") throw ErrorMsg.htmlError(htmlError[405])

			const authID = req.auth?.authID as number
			const { id, status }: StatusDTO = req.body as StatusDTO
			const params = SetStatusLabelUsecaseParams.fromBackend(
				id,
				status as ItemStatusType,
				authID
			)

			// Services
			const labelsImplement = new LabelsImplement()
			const labelsService = new LabelsService(labelsImplement)

			// Calling database
			const setStatusLabel = new SetStatusLabelUsecase(labelsService)
			const { data, error } = await setStatusLabel.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data, error)
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}

	async get(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const id = req.params["id"]
			const params = IDUsecaseParams.fromBackend(id)

			// Services
			const announcesImplement = new LabelsImplement()
			const announcesService = new LabelsService(announcesImplement)

			// Calling database
			const getLabel = new GetLabelUsecase(announcesService)

			const { data, error } = await getLabel.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data, error)
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}
}
