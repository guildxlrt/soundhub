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
	CreateEventReqDTO,
	DeleteEventAdapter,
	FindEventsByDateReqDTO,
	FindEventsByPlaceReqDTO,
	IEvent,
	ModifyEventAdapter,
	ModifyEventReqDTO,
	NewEventAdapter,
	apiErrorMsg,
} from "Shared"
import { errHandler, ApiRequest, ApiReply } from "../../assets"
// return errHandler.reply
export class EventsController implements IEventsCtrl {
	async create(req: ApiRequest, res: ApiReply) {
		if (req.method !== "POST") return res.status(405).send({ error: apiErrorMsg.e405 })

		try {
			const owner = req.auth?.profileID

			const { artists, date, place, text, title }: CreateEventReqDTO =
				req.body as CreateEventReqDTO
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

			// Saving Profile
			const createEvent = new CreateEventUsecase(databaseServices)
			const { data, error } = await createEvent.execute(new NewEventAdapter(event, undefined))
			if (error) throw error

			// Return infos
			return res.status(202).send(data)
		} catch (error) {
			return errHandler.reply(error, res)
		}
	}

	async modify(req: ApiRequest, res: ApiReply) {
		if (req.method !== "PUT") return res.status(405).send({ error: apiErrorMsg.e405 })

		try {
			const owner = req.auth?.profileID as number

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
			const { data, error } = await ModifyEvent.execute(
				new ModifyEventAdapter(event, undefined)
			)
			if (error) throw error

			// Return infos
			return res.status(202).send(data)
		} catch (error) {
			return errHandler.reply(error, res)
		}
	}

	async delete(req: ApiRequest, res: ApiReply) {
		if (req.method !== "DELETE") return res.status(405).send({ error: apiErrorMsg.e405 })

		try {
			const id = Number(req.params["id"])
			const owner = req.auth?.profileID as number

			// Operators
			// ... doing some heathcheck

			// Saving Profile
			const deleteEvent = new DeleteEventUsecase(databaseServices)
			const { data, error } = await deleteEvent.execute(new DeleteEventAdapter(id, owner))
			if (error) throw error

			// Return infos
			return res.status(202).send(data)
		} catch (error) {
			return errHandler.reply(error, res)
		}
	}

	async get(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: apiErrorMsg.e405 })

		try {
			const id = Number(req.params["id"])

			const getEvent = new GetEventUsecase(databaseServices)
			const { data, error } = await getEvent.execute(id)
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			return errHandler.reply(error, res)
		}
	}

	async getAll(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: apiErrorMsg.e405 })

		try {
			const getAllEvents = new GetAllEventsUsecase(databaseServices)
			const { data, error } = await getAllEvents.execute()
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			return errHandler.reply(error, res)
		}
	}

	async findManyByArtist(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: apiErrorMsg.e405 })

		try {
			const id = Number(req.params["id"])
			const findEventsByArtist = new FindEventsByArtistUsecase(databaseServices)
			const { data, error } = await findEventsByArtist.execute(id)
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			return errHandler.reply(error, res)
		}
	}

	async findManyByDate(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: apiErrorMsg.e405 })

		try {
			const inputs: FindEventsByDateReqDTO = req.body as FindEventsByDateReqDTO
			const findEventsByDate = new FindEventsByDateUsecase(databaseServices)
			const { data, error } = await findEventsByDate.execute(inputs)
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			return errHandler.reply(error, res)
		}
	}

	async findManyByPlace(req: ApiRequest, res: ApiReply) {
		if (req.method !== "GET") return res.status(405).send({ error: apiErrorMsg.e405 })

		try {
			const inputs: FindEventsByPlaceReqDTO = req.body as FindEventsByPlaceReqDTO
			const findEventsByPlace = new FindEventsByPlaceUsecase(databaseServices)
			const { data, error } = await findEventsByPlace.execute(inputs)
			if (error) throw error

			// Return infos
			return res.status(200).send(data)
		} catch (error) {
			return errHandler.reply(error, res)
		}
	}
}
