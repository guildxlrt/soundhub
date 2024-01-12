import { IEventsController } from "../../assets"
import {
	CreateEventUsecase,
	DeleteEventUsecase,
	FindEventsByArtistUsecase,
	FindEventsByDateUsecase,
	FindEventsByPlaceUsecase,
	GetAllEventsUsecase,
	GetEventUsecase,
	ModifyEventUsecase,
} from "Interactors"
import { databaseServices } from "Infra-backend"
import {
	CreateEventReqDTO,
	DeleteEventParams,
	Event,
	FindEventsByDateReqDTO,
	FindEventsByPlaceReqDTO,
	ModifyEventParams,
	ModifyEventReqDTO,
	NewEventParams,
	apiErrorMsg,
} from "Shared"
import { errHandler, ApiRequest, ApiReply } from "../../assets"
// return errHandler.reply
export class EventsController implements IEventsController {
	async create(req: ApiRequest, res: ApiReply) {
		if (req.method !== "POST") return res.status(405).send({ error: apiErrorMsg.e405 })

		try {
			const user = req.auth?.profileId

			const { artists, date, place, text, title }: CreateEventReqDTO =
				req.body as CreateEventReqDTO
			// Operators
			// ... doing some heathcheck

			// Saving Profile
			const event = new Event(undefined, user, date, place, artists, title, text)
			const createEvent = new CreateEventUsecase(databaseServices)
			const { data, error } = await createEvent.execute(new NewEventParams(event))
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
			const user = req.auth?.profileId

			const { artists, date, place, text, title }: ModifyEventReqDTO =
				req.body as ModifyEventReqDTO

			// Operators
			// ... doing some heathcheck

			// Saving Profile
			const event = new Event(undefined, user, date, place, artists, title, text)

			const ModifyEvent = new ModifyEventUsecase(databaseServices)
			const { data, error } = await ModifyEvent.execute(new ModifyEventParams(event, user))
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
			const user = req.auth?.profileId

			// Operators
			// ... doing some heathcheck

			// Saving Profile
			const deleteEvent = new DeleteEventUsecase(databaseServices)
			const { data, error } = await deleteEvent.execute(new DeleteEventParams(id, user))
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
