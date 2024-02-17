import { EventsImplement, StorageImplement } from "Infra-backend"
import {
	CreateEventUsecase,
	DeleteEventUsecaseParams,
	DeleteEventUsecase,
	GetEventUsecase,
	EditEventUsecase,
	IDUsecaseParams,
	NewEventUsecaseParams,
	EditEventUsecaseParams,
	StorageService,
	EventsService,
} from "Application"
import {
	ExpressRequest,
	ExpressResponse,
	CreateEventDTO,
	EditEventDTO,
	htmlError,
	ErrorMsg,
	ResponseDTO,
} from "Shared"
import { ApiErrorHandler, IEventsCtrl } from "../assets"

export class EventsController implements IEventsCtrl {
	async create(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "POST") throw ErrorMsg.htmlError(htmlError[405])

			const authID = req.auth?.authID as number
			const file = req.image as unknown
			const event = req.body as CreateEventDTO
			const params = NewEventUsecaseParams.fromBackend(event, authID, file)

			// Services
			const eventsImplement = new EventsImplement()
			const eventsService = new EventsService(eventsImplement)
			const storageImplement = new StorageImplement()
			const storageService = new StorageService(storageImplement)

			// Calling database Profile
			const createEvent = new CreateEventUsecase(eventsService, storageService)
			const { data, error } = await createEvent.execute(params)

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

			const authID = req.auth?.authID as number
			const file = req.image as unknown
			const event = req.body as EditEventDTO
			const params = EditEventUsecaseParams.fromBackend(event, authID, file)

			// Services
			const eventsImplement = new EventsImplement()
			const eventsService = new EventsService(eventsImplement)
			const storageImplement = new StorageImplement()
			const storageService = new StorageService(storageImplement)

			// Calling database
			const EditEvent = new EditEventUsecase(eventsService, storageService)
			const { data, error } = await EditEvent.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data, error)
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}

	async delete(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "DELETE") throw ErrorMsg.htmlError(htmlError[405])

			const id = Number(req.params["id"])
			const authID = req.auth?.authID as number
			const params = DeleteEventUsecaseParams.fromBackend(id, authID)

			// Services
			const eventsImplement = new EventsImplement()
			const eventsService = new EventsService(eventsImplement)
			const storageImplement = new StorageImplement()
			const storageService = new StorageService(storageImplement)

			// Calling database
			const deleteEvent = new DeleteEventUsecase(eventsService, storageService)
			const { data, error } = await deleteEvent.execute(params)

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
			const eventsImplement = new EventsImplement()
			const eventsService = new EventsService(eventsImplement)

			// Calling database
			const getEvent = new GetEventUsecase(eventsService)
			const { data, error } = await getEvent.execute(params)

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data, error)
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}
}
