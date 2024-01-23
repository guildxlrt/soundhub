import { IEventsCtrl } from "../../assets"
import {
	CreateEventUsecase,
	DeleteEventUsecase,
	FindEventsByArtistUsecase,
	FindEventsByDateUsecase,
	FindEventsByPlaceUsecase,
	GetAllEventsUsecase,
	GetEventUsecase,
	ModifyEventUsecase,
} from "Domain"
import { databaseServices } from "Infra-backend"
import {
	CreateEventReplyDTO,
	CreateEventReqDTO,
	DeleteEventAdapter,
	DeleteEventReplyDTO,
	FileType,
	FindEventsByArtistReplyDTO,
	FindEventsByDateReplyDTO,
	FindEventsByDateReqDTO,
	FindEventsByPlaceReplyDTO,
	FindEventsByPlaceReqDTO,
	GetAllEventsReplyDTO,
	GetEventReplyDTO,
	IEvent,
	ModifyEventAdapter,
	ModifyEventReplyDTO,
	ModifyEventReqDTO,
	NewEventAdapter,
	apiErrorMsg,
} from "Shared"
import { ApiErrHandler, ApiRequest, ApiReply } from "../../assets"
// return ApiErrHandler.reply
export class EventsController implements IEventsCtrl {
	async create(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "POST") return res.status(405).send({ error: apiErrorMsg.e405 })

			const owner = req.auth?.profileID
			const file: FileType = req.file as FileType
			const { artists, date, place, text, title }: CreateEventReqDTO =
				req.body as CreateEventReqDTO
			// Operators
			// ... doing some heathcheck

			const event: IEvent = {
				id: undefined,
				owner_id: owner as number,
				date: date,
				place: place,
				artists: artists,
				title: title,
				text: text,
				imageUrl: null,
			}

			// Saving Profile
			const createEvent = new CreateEventUsecase(databaseServices)
			const { data, error } = await createEvent.execute(new NewEventAdapter(event, file))
			if (error) throw error

			// Return infos
			return res.status(202).send(new CreateEventReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async modify(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "PUT") return res.status(405).send({ error: apiErrorMsg.e405 })

			const owner = req.auth?.profileID as number
			const file: FileType = req.file as FileType
			const { artists, date, place, text, title }: ModifyEventReqDTO =
				req.body as ModifyEventReqDTO

			// Operators
			// ... doing some heathcheck

			const event: IEvent = {
				id: undefined,
				owner_id: owner,
				date: date,
				place: place,
				artists: artists,
				title: title,
				text: text,
				imageUrl: null,
			}

			// Saving Changes
			const ModifyEvent = new ModifyEventUsecase(databaseServices)
			const { data, error } = await ModifyEvent.execute(new ModifyEventAdapter(event, file))
			if (error) throw error

			// Return infos
			return res.status(202).send(new ModifyEventReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async delete(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "DELETE") return res.status(405).send({ error: apiErrorMsg.e405 })

			const id = Number(req.params["id"])
			const owner = req.auth?.profileID as number

			// Operators
			// ... doing some heathcheck

			// Saving Profile
			const deleteEvent = new DeleteEventUsecase(databaseServices)
			const { data, error } = await deleteEvent.execute(new DeleteEventAdapter(id, owner))
			if (error) throw error

			// Return infos
			return res.status(202).send(new DeleteEventReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async get(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: apiErrorMsg.e405 })

			const id = Number(req.params["id"])

			const getEvent = new GetEventUsecase(databaseServices)
			const { data, error } = await getEvent.execute(id)
			if (error) throw error

			// Return infos
			return res.status(200).send(new GetEventReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async getAll(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: apiErrorMsg.e405 })

			const getAllEvents = new GetAllEventsUsecase(databaseServices)
			const { data, error } = await getAllEvents.execute()
			if (error) throw error

			// Return infos
			return res.status(200).send(new GetAllEventsReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async findManyByArtist(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: apiErrorMsg.e405 })

			const id = Number(req.params["id"])
			const findEventsByArtist = new FindEventsByArtistUsecase(databaseServices)
			const { data, error } = await findEventsByArtist.execute(id)
			if (error) throw error

			// Return infos
			return res.status(200).send(new FindEventsByArtistReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async findManyByDate(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: apiErrorMsg.e405 })

			const inputs: FindEventsByDateReqDTO = req.body as FindEventsByDateReqDTO
			const findEventsByDate = new FindEventsByDateUsecase(databaseServices)
			const { data, error } = await findEventsByDate.execute(inputs)
			if (error) throw error

			// Return infos
			return res.status(200).send(new FindEventsByDateReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}

	async findManyByPlace(req: ApiRequest, res: ApiReply): Promise<ApiReply> {
		try {
			if (req.method !== "GET") return res.status(405).send({ error: apiErrorMsg.e405 })

			const inputs: FindEventsByPlaceReqDTO = req.body as FindEventsByPlaceReqDTO
			const findEventsByPlace = new FindEventsByPlaceUsecase(databaseServices)
			const { data, error } = await findEventsByPlace.execute(inputs)
			if (error) throw error

			// Return infos
			return res.status(200).send(new FindEventsByPlaceReplyDTO(data))
		} catch (error) {
			return ApiErrHandler.reply(error, res)
		}
	}
}
