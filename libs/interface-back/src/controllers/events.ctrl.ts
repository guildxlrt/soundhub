import { EventsImplement, StorageImplement } from "Infra-backend"
import {
	CreateEventUsecase,
	DeleteEventUsecaseParams,
	DeleteEventUsecase,
	FindEventsByArtistUsecase,
	FindEventsByDateUsecase,
	FindEventsByPlaceUsecase,
	GetAllEventsUsecase,
	GetEventUsecase,
	EditEventUsecase,
	IDUsecaseParams,
	NewEventUsecaseParams,
	EditEventUsecaseParams,
	StorageService,
	EventsService,
	DateUsecaseParams,
	PlaceUsecaseParams,
	FindEventsByArtistGenreUsecase,
	GenreUsecaseParams,
} from "Application"
import { StreamFile } from "Domain"
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

			const owner = req.auth?.profileID as number
			const file = req.image as StreamFile
			const event = req.body as CreateEventDTO
			const params = NewEventUsecaseParams.fromDto(event, owner, file)

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
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}

	async edit(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "PUT") throw ErrorMsg.htmlError(htmlError[405])

			const owner = req.auth?.profileID as number
			const file = req.image as StreamFile
			const event = req.body as EditEventDTO
			const params = EditEventUsecaseParams.fromDto(event, owner, file)

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
			const owner = req.auth?.profileID as number
			const params = DeleteEventUsecaseParams.fromDtoBackend(id, owner)

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
			const params = new IDUsecaseParams(id)

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

	async getAll(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			// Services
			const storageImplement = new StorageImplement()
			const storageService = new StorageService(storageImplement)
			const eventsImplement = new EventsImplement()
			const eventsService = new EventsService(eventsImplement)

			// Calling database
			const getAllEvents = new GetAllEventsUsecase(eventsService)
			const { data, error } = await getAllEvents.execute()

			if (error) throw error
			if (!data) throw ErrorMsg.htmlError(htmlError[500])

			const reponse = new ResponseDTO(data, error)
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}

	async findMany(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

		const date = req.query?.["date"] as string
		const artistID = req.query?.["artist"] as string
		const genre = req.query?.["genre"] as string
		const place = req.query?.["place"] as string

		// Services
		const eventsImplement = new EventsImplement()
		const eventsService = new EventsService(eventsImplement)

		if (artistID) {
			try {
				const params = new IDUsecaseParams(artistID)

				// Calling database
				const findEventsByArtist = new FindEventsByArtistUsecase(eventsService)
				const { data, error } = await findEventsByArtist.execute(params)

				if (error) throw error
				if (!data) throw ErrorMsg.htmlError(htmlError[500])

				const reponse = new ResponseDTO(data, error)
				return res.status(200).send(reponse)
			} catch (error) {
				return ApiErrorHandler.reply(error, res)
			}
		}
		if (date) {
			try {
				const params = DateUsecaseParams.fromReqParams(date)

				// Calling database
				const findEventsByDate = new FindEventsByDateUsecase(eventsService)
				const { data, error } = await findEventsByDate.execute(params)

				if (error) throw error
				if (!data) throw ErrorMsg.htmlError(htmlError[500])

				const reponse = new ResponseDTO(data, error)
				return res.status(200).send(reponse)
			} catch (error) {
				return ApiErrorHandler.reply(error, res)
			}
		}
		if (genre) {
			try {
				const params = new PlaceUsecaseParams(genre)

				// Calling database
				const findEventsByPlace = new FindEventsByPlaceUsecase(eventsService)
				const { data, error } = await findEventsByPlace.execute(params)

				if (error) throw error
				if (!data) throw ErrorMsg.htmlError(htmlError[500])

				const reponse = new ResponseDTO(data, error)
				return res.status(200).send(reponse)
			} catch (error) {
				return ApiErrorHandler.reply(error, res)
			}
		}
		if (place) {
			try {
				const params = new GenreUsecaseParams(place)

				// Calling database
				const findEventsByGenre = new FindEventsByArtistGenreUsecase(eventsService)
				const { data, error } = await findEventsByGenre.execute(params)

				if (error) throw error
				if (!data) throw ErrorMsg.htmlError(htmlError[500])

				const reponse = new ResponseDTO(data, error)
				return res.status(200).send(reponse)
			} catch (error) {
				return ApiErrorHandler.reply(error, res)
			}
		}

		return res.status(202).end()
	}
}
