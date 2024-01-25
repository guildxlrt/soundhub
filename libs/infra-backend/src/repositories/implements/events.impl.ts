import { Event, EventsRepository } from "Domain"
import { Reply, filePath, FileManipulator } from "../../utils"
import {
	ErrorMsg,
	IEventSucc,
	IEventsListItemSucc,
	IEventsListSucc,
	EventID,
	UserAuthID,
	AnnounceID,
	FileType,
	htmlError,
} from "Shared"
import { GetID, dbClient } from "../../database"

export class EventsImplement implements EventsRepository {
	async create(data: Event, file?: FileType): Promise<Reply<boolean>> {
		try {
			const { owner_id, date, place, artists, title, text } = data

			// Storing files
			const fileOrigin = filePath.origin.image + file?.filename
			const fileStore = filePath.store.event + file?.filename
			await FileManipulator.move(fileOrigin, fileStore)

			await dbClient.event.create({
				data: {
					owner_id: owner_id as number,
					date: date,
					place: place,
					artists: artists,
					title: title,
					text: text,
					imagePath: fileStore,
				},
			})

			// RESPONSE
			return new Reply<boolean>(true)
		} catch (error) {
			const res = new Reply<boolean>(false, ErrorMsg.htmlError(htmlError[500]))

			return res
		}
	}

	async edit(data: Event, file?: FileType): Promise<Reply<boolean>> {
		try {
			const { id, owner_id, date, place, artists, title, text } = data

			const userAuth = data.owner_id

			// owner verification
			const eventOwner = await GetID.owner(id as number, "event")
			if (userAuth !== eventOwner) throw ErrorMsg.htmlError(htmlError[403])

			// STORING FILE
			const fileOrigin = filePath.origin.image + file?.filename
			const fileStore = filePath.store.event + file?.filename
			await FileManipulator.move(fileOrigin, fileStore)

			// DELETE OLD FILE
			// ... get the id
			await FileManipulator.delete("")

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
					imagePath: fileStore,
				},
			})

			// RESPONSE
			return new Reply<boolean>(true)
		} catch (error) {
			const res = new Reply<boolean>(false, ErrorMsg.htmlError(htmlError[500]))

			return res
		}
	}

	async delete(id: AnnounceID, userAuth?: UserAuthID): Promise<Reply<void>> {
		try {
			// owner verification
			const eventOwner = await GetID.owner(id as number, "event")
			if (userAuth !== eventOwner) throw ErrorMsg.htmlError(htmlError[403])

			// persist
			await dbClient.event.delete({
				where: {
					id: id,
				},
			})

			// RESPONSE
			return new Reply<void>()
		} catch (error) {
			const res = new Reply<void>(undefined, new ErrorMsg(`Error: failed to delete`, 500))

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
					imagePath: true,
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
				imagePath: event?.imagePath,
			})
		} catch (error) {
			return new Reply<IEventSucc>(undefined, ErrorMsg.htmlError(htmlError[500]))
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
					imagePath: true,
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
					imagePath: event.imagePath,
				}
			})

			// RESPONSE
			return new Reply<IEventsListSucc>(list)
		} catch (error) {
			return new Reply<IEventsListSucc>(undefined, ErrorMsg.htmlError(htmlError[500]))
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
					imagePath: true,
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
					imagePath: event.imagePath,
				}
			})

			// RESPONSE
			return new Reply<IEventsListSucc>(list)
		} catch (error) {
			return new Reply<IEventsListSucc>(undefined, ErrorMsg.htmlError(htmlError[500]))
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
					imagePath: true,
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
					imagePath: event.imagePath,
				}
			})

			// RESPONSE
			return new Reply<IEventsListSucc>(list)
		} catch (error) {
			return new Reply<IEventsListSucc>(undefined, ErrorMsg.htmlError(htmlError[500]))
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
					imagePath: true,
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
					imagePath: event.imagePath,
				}
			})

			// RESPONSE
			return new Reply<IEventsListSucc>(list)
		} catch (error) {
			return new Reply<IEventsListSucc>(undefined, ErrorMsg.htmlError(htmlError[500]))
		}
	}
}