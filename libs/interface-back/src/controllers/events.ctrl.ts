import {
	ArtistsImplement,
	EventsImplement,
	PlayAtEventImplement,
	StorageImplement,
} from "Infra-backend"
import {
	CreateEventUsecase,
	DeleteEventUsecaseParams,
	DeleteEventUsecase,
	GetAllEventsUsecase,
	GetEventUsecase,
	EditEventUsecase,
	IDUsecaseParams,
	NewEventUsecaseParams,
	EditEventUsecaseParams,
	StorageService,
	EventsService,
	FindEventsByArtistUsecase,
	ArtistsService,
	PlayAtEventService,
	FindEventsByDateUsecase,
	DateUsecaseParams,
	PlaceUsecaseParams,
	FindEventsByPlaceUsecase,
	GenreUsecaseParams,
	FindEventsByArtistGenreUsecase,
} from "Application"
import {
	ExpressRequest,
	ExpressResponse,
	CreateEventDTO,
	EditEventDTO,
	htmlError,
	ErrorMsg,
	ResponseDTO,
	GetEventShortDTO,
	SearchResponseDTO,
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

	async search(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
		try {
			if (req.method !== "GET") throw ErrorMsg.htmlError(htmlError[405])

			const results: GetEventShortDTO[] = []
			const errors: ErrorMsg[] = []

			const date = req.query?.["date"] as string
			const artistID = req.query?.["artist-id"] as string
			const genre = req.query?.["genre"] as string
			const place = req.query?.["place"] as string

			// Services
			const artistsImplement = new ArtistsImplement()
			const artistsService = new ArtistsService(artistsImplement)
			const eventsImplement = new EventsImplement()
			const eventsService = new EventsService(eventsImplement)
			const playAtEventImplement = new PlayAtEventImplement()
			const playAtEventService = new PlayAtEventService(playAtEventImplement)

			if (artistID) {
				const params = IDUsecaseParams.fromBackend(artistID)
				const findEventsByArtist = new FindEventsByArtistUsecase(
					playAtEventService,
					artistsService
				)
				const resultsByArtist = await findEventsByArtist.execute(params)

				if (resultsByArtist.data) results.push(...resultsByArtist.data)
				if (resultsByArtist.error) errors.push(resultsByArtist.error)
			} else if (date) {
				const params = DateUsecaseParams.fromBackend(date)
				const findEventsByDate = new FindEventsByDateUsecase(eventsService)
				const resultsByDate = await findEventsByDate.execute(params)

				if (resultsByDate.data) results.push(...resultsByDate.data)
				if (resultsByDate.error) errors.push(resultsByDate.error)
			} else if (place) {
				const params = new PlaceUsecaseParams(place)
				const findEventsByPlace = new FindEventsByPlaceUsecase(eventsService)
				const resultsByGenre = await findEventsByPlace.execute(params)

				if (resultsByGenre.data) results.push(...resultsByGenre.data)
				if (resultsByGenre.error) errors.push(resultsByGenre.error)
			} else if (genre) {
				const params = new GenreUsecaseParams(genre)
				const findEventsByGenre = new FindEventsByArtistGenreUsecase(
					playAtEventService,
					artistsService
				)
				const resultsByPlace = await findEventsByGenre.execute(params)

				if (resultsByPlace.data) results.push(...resultsByPlace.data)
				if (resultsByPlace.error) errors.push(resultsByPlace.error)
			}

			if (!date || !genre || !artistID || !place) {
				// Services
				const eventsImplement = new EventsImplement()
				const eventsService = new EventsService(eventsImplement)

				// Calling database
				const getAllEvents = new GetAllEventsUsecase(eventsService)
				const resultsAll = await getAllEvents.execute()

				if (resultsAll.data) results.push(...resultsAll.data)
				if (resultsAll.error) errors.push(resultsAll.error)
			}

			// RETURN RESULTS
			const reponse = new SearchResponseDTO([...new Set(results)], errors)
			return res.status(200).send(reponse)
		} catch (error) {
			return ApiErrorHandler.reply(error, res)
		}
	}
}
