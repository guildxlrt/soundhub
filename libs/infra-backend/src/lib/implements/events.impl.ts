import { Event, EventsRepository } from "Domain"
import { Reply, dbClient, getArtistID } from "../../assets"
import {
	ErrorMsg,
	IEventSucc,
	IEventsListItemSucc,
	IEventsListSucc,
	EventID,
	apiErrorMsg,
	UserAuthID,
	AnnounceID,
	FileType,
} from "Shared"

export class EventsImplement implements EventsRepository {
	async create(data: Event, file?: FileType): Promise<Reply<boolean>> {
		try {
			const { owner_id, date, place, artists, title, text, imageUrl } = data

			// Storing files
			console.log(file)

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

	async modify(data: Event, file?: FileType): Promise<Reply<boolean>> {
		try {
			const { id, owner_id, date, place, artists, title, text, imageUrl } = data

			const userAuth = data.owner_id

			// owner verification
			const event = await dbClient.event.findUnique(getArtistID(id as number))
			if (userAuth !== event?.owner_id) throw new ErrorMsg(403, apiErrorMsg.e403)

			// Storing files
			console.log(file)

			// persist
			await dbClient.event.update({
				where: {
					id: id as number,
					owner_id: owner_id,
				},
				data: {
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

	async delete(id: AnnounceID, userAuth?: UserAuthID): Promise<Reply<void>> {
		try {
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

	async get(id: EventID): Promise<Reply<IEventSucc>> {
		try {
			const event = await dbClient.event.findUnique({
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
				id: event?.id,
				owner_id: event?.owner_id,
				date: event?.date,
				place: event?.place,
				artists: event?.artists,
				title: event?.title,
				text: event?.text,
				imageUrl: event?.imageUrl,
			})
		} catch (error) {
			return new Reply<IEventSucc>(undefined, new ErrorMsg(500, apiErrorMsg.e500, error))
		}
	}

	async getAll(): Promise<Reply<IEventsListSucc>> {
		try {
			const event = await dbClient.event.findMany({
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
			const list = event.map((event): IEventsListItemSucc => {
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

	async findManyByArtist(id: EventID): Promise<Reply<IEventsListSucc>> {
		try {
			const artistID = id

			const event = await dbClient.event.findMany({
				where: {
					artists: { has: artistID },
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
			const list = event.map((event): IEventsListItemSucc => {
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

	async findManyByDate(date: Date): Promise<Reply<IEventsListSucc>> {
		try {
			const event = await dbClient.event.findMany({
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
			const list = event.map((event): IEventsListItemSucc => {
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

	async findManyByPlace(place: string): Promise<Reply<IEventsListSucc>> {
		try {
			const event = await dbClient.event.findMany({
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
			const list = event.map((event): IEventsListItemSucc => {
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
