import { EventsRepository } from "Domain"
import { Reply, dbClient, getArtistID } from "../../assets"
import {
	ErrorMsg,
	IEventSucc,
	IEventsListItemSucc,
	IEventsListSucc,
	EntityId,
	ModifyEventParams,
	NewEventParams,
	PlaceParams,
	DateParams,
	DeleteEventParams,
	apiErrorMsg,
} from "Shared"

export class EventsImplement implements EventsRepository {
	async create(inputs: NewEventParams): Promise<Reply<boolean>> {
		try {
			const { owner_id, date, place, artists, title, text, imageUrl } = inputs.data

			// Storing files
			// ...

			await dbClient.event.create({
				data: {
					owner_id: owner_id as number,
					date: date,
					place: place,
					artists: artists,
					title: title,
					text: text,
					imageUrl: imageUrl,
				},
			})

			// RESPONSE
			return new Reply<boolean>(true)
		} catch (error) {
			const res = new Reply<boolean>(false, new ErrorMsg(500, apiErrorMsg.e500, error))

			return res
		}
	}

	async modify(inputs: ModifyEventParams): Promise<Reply<boolean>> {
		try {
			const { id, owner_id, date, place, artists, title, text, imageUrl } = inputs.data

			const { userAuth } = inputs

			// owner verification
			const event = await dbClient.event.findUnique(getArtistID(id))

			if (userAuth !== event?.owner_id) throw new ErrorMsg(403, apiErrorMsg.e403)

			// persist
			await dbClient.event.update({
				where: {
					id: id,
				},
				data: {
					owner_id: owner_id,
					date: date,
					place: place,
					artists: artists,
					title: title,
					text: text,
					imageUrl: imageUrl,
				},
			})

			// RESPONSE
			return new Reply<boolean>(true)
		} catch (error) {
			const res = new Reply<boolean>(false, new ErrorMsg(500, apiErrorMsg.e500, error))

			return res
		}
	}

	async delete(inputs: DeleteEventParams): Promise<Reply<void>> {
		try {
			const { id, userAuth } = inputs

			// owner verification
			const event = await dbClient.event.findUnique(getArtistID(id))

			if (userAuth !== event?.owner_id) throw new ErrorMsg(403, apiErrorMsg.e403)

			// persist
			await dbClient.event.delete({
				where: {
					id: id,
				},
			})

			// RESPONSE
			return new Reply<void>()
		} catch (error) {
			const res = new Reply<void>(
				undefined,
				new ErrorMsg(500, `Error: failed to delete`, error)
			)

			return res
		}
	}

	async get(id: EntityId): Promise<Reply<IEventSucc>> {
		try {
			const data = await dbClient.event.findUnique({
				where: {
					id: id,
				},
				select: {
					id: true,
					owner_id: true,
					date: true,
					place: true,
					artists: true,
					title: true,
					text: true,
					imageUrl: true,
				},
			})

			// RESPONSE
			return new Reply<IEventSucc>({
				id: data?.id,
				owner_id: data?.owner_id,
				date: data?.date,
				place: data?.place,
				artists: data?.artists,
				title: data?.title,
				text: data?.text,
				imageUrl: data?.imageUrl,
			})
		} catch (error) {
			return new Reply<IEventSucc>(undefined, new ErrorMsg(500, apiErrorMsg.e500, error))
		}
	}

	async getAll(): Promise<Reply<IEventsListSucc>> {
		try {
			const data = await dbClient.event.findMany({
				select: {
					id: true,
					owner_id: true,
					date: true,
					place: true,
					artists: true,
					title: true,
					imageUrl: true,
				},
			})

			// Reorganize
			const list = data.map((event): IEventsListItemSucc => {
				return {
					id: event.id,
					owner_id: event.owner_id,
					date: event.date,
					place: event.place,
					artists: event.artists,
					title: event.title,
					imageUrl: event.imageUrl,
				}
			})

			// RESPONSE
			return new Reply<IEventsListSucc>(list)
		} catch (error) {
			return new Reply<IEventsListSucc>(undefined, new ErrorMsg(500, apiErrorMsg.e500, error))
		}
	}

	async findManyByArtist(id: EntityId): Promise<Reply<IEventsListSucc>> {
		try {
			const artistId = id

			const data = await dbClient.event.findMany({
				where: {
					artists: { has: artistId },
				},
				select: {
					id: true,
					owner_id: true,
					date: true,
					place: true,
					artists: true,
					title: true,
					imageUrl: true,
				},
			})

			// Reorganize
			const list = data.map((event): IEventsListItemSucc => {
				return {
					id: event.id,
					owner_id: event.owner_id,
					date: event.date,
					place: event.place,
					artists: event.artists,
					title: event.title,
					imageUrl: event.imageUrl,
				}
			})

			// RESPONSE
			return new Reply<IEventsListSucc>(list)
		} catch (error) {
			return new Reply<IEventsListSucc>(undefined, new ErrorMsg(500, apiErrorMsg.e500, error))
		}
	}

	async findManyByDate(inputs: DateParams): Promise<Reply<IEventsListSucc>> {
		try {
			const date = inputs.date

			const data = await dbClient.event.findMany({
				where: {
					date: date,
				},
				select: {
					id: true,
					owner_id: true,
					place: true,
					artists: true,
					title: true,
					imageUrl: true,
				},
			})

			// Reorganize
			const list = data.map((event): IEventsListItemSucc => {
				return {
					id: event.id,
					owner_id: event.owner_id,
					date: date,
					place: event.place,
					artists: event.artists,
					title: event.title,
					imageUrl: event.imageUrl,
				}
			})

			// RESPONSE
			return new Reply<IEventsListSucc>(list)
		} catch (error) {
			return new Reply<IEventsListSucc>(undefined, new ErrorMsg(500, apiErrorMsg.e500, error))
		}
	}

	async findManyByPlace(inputs: PlaceParams): Promise<Reply<IEventsListSucc>> {
		try {
			const place = inputs.place

			const data = await dbClient.event.findMany({
				where: {
					place: place,
				},
				select: {
					id: true,
					owner_id: true,
					date: true,
					artists: true,
					title: true,
					imageUrl: true,
				},
			})

			// Reorganize
			const list = data.map((event): IEventsListItemSucc => {
				return {
					id: event.id,
					owner_id: event.owner_id,
					date: event.date,
					place: place,
					artists: event.artists,
					title: event.title,
					imageUrl: event.imageUrl,
				}
			})

			// RESPONSE
			return new Reply<IEventsListSucc>(list)
		} catch (error) {
			return new Reply<IEventsListSucc>(undefined, new ErrorMsg(500, apiErrorMsg.e500, error))
		}
	}
}
