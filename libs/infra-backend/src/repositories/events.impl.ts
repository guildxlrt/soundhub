import { EventsBackendRepos } from "Domain"
import { Event } from "Domain"
import { EventDTO, EventShortDTO, EventID } from "Shared"
import { dbClient } from "../prisma"
import { ApiErrHandler } from "../utils"

export class EventsImplement implements EventsBackendRepos {
	private event = dbClient.event

	async create(data: Event): Promise<boolean> {
		try {
			const { owner_id, date, place, artists, title, text } = data

			await this.event.create({
				data: {
					owner_id: owner_id as number,
					date: date,
					place: place,
					artists: artists,
					title: title,
					text: text,
				},
			})

			// RESPONSE
			return true
		} catch (error) {
			throw new ApiErrHandler().handleDBError(error)
		}
	}

	async edit(data: Event): Promise<boolean> {
		try {
			const { id, owner_id, date, place, artists, title, text } = data

			// persist
			await this.event.update({
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
				},
			})

			// RESPONSE
			return true
		} catch (error) {
			throw new ApiErrHandler().handleDBError(error)
		}
	}

	async delete(id: EventID): Promise<boolean> {
		try {
			// persist
			await this.event.delete({
				where: {
					id: id,
				},
			})

			return true
		} catch (error) {
			throw new ApiErrHandler().handleDBError(error)
		}
	}

	async get(id: EventID): Promise<EventDTO> {
		try {
			const event = await this.event.findUniqueOrThrow({
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

			return EventDTO.createFromData(event)
		} catch (error) {
			throw new ApiErrHandler().handleDBError(error)
		}
	}

	async getAll(): Promise<EventShortDTO[]> {
		try {
			const events = await this.event.findMany({
				select: {
					id: true,
					date: true,
					place: true,
					artists: true,
					title: true,
					imagePath: true,
				},
			})

			return EventShortDTO.createArrayFromData(events)
		} catch (error) {
			throw new ApiErrHandler().handleDBError(error)
		}
	}

	async findManyByArtist(id: EventID): Promise<EventShortDTO[]> {
		try {
			const profileID = id

			const events = await this.event.findMany({
				where: {
					artists: { has: profileID },
				},
				select: {
					id: true,
					date: true,
					place: true,
					artists: true,
					title: true,
					imagePath: true,
				},
			})

			return EventShortDTO.createArrayFromData(events)
		} catch (error) {
			throw new ApiErrHandler().handleDBError(error)
		}
	}

	async findManyByDate(date: Date): Promise<EventShortDTO[]> {
		try {
			const events = await this.event.findMany({
				where: {
					date: date,
				},
				select: {
					id: true,
					place: true,
					artists: true,
					title: true,
					imagePath: true,
				},
			})

			return EventShortDTO.createArrayFromData(events)
		} catch (error) {
			throw new ApiErrHandler().handleDBError(error)
		}
	}

	async findManyByPlace(place: string): Promise<EventShortDTO[]> {
		try {
			const events = await this.event.findMany({
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

			return EventShortDTO.createArrayFromData(events)
		} catch (error) {
			throw new ApiErrHandler().handleDBError(error)
		}
	}

	async getOwner(id: number) {
		try {
			const event = await this.event.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					owner_id: true,
				},
			})
			return event?.owner_id
		} catch (error) {
			throw new ApiErrHandler().handleDBError(error).setMessage("error to authentificate")
		}
	}

	async getImagePath(id: EventID): Promise<string | null> {
		try {
			const event = await this.event.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					imagePath: true,
				},
			})
			return event?.imagePath
		} catch (error) {
			throw new ApiErrHandler().handleDBError(error).setMessage("error getting image path")
		}
	}

	async setImagePath(path: string | null, id: EventID): Promise<boolean> {
		try {
			await this.event.update({
				where: {
					id: id,
				},
				data: {
					imagePath: path,
				},
			})
			return true
		} catch (error) {
			throw new ApiErrHandler().handleDBError(error).setMessage("error to get image path")
		}
	}
}
