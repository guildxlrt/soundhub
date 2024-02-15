import { EventsBackendRepos } from "Domain"
import { Event } from "Domain"
import {
	EventID,
	IGetEventSuccess,
	IGetEventShortSuccess,
	ArtistProfileID,
	ItemStatusEnum,
} from "Shared"
import { dbClient } from "../database"
import { DatabaseErrorHandler } from "../utils"

export class EventsImplement implements EventsBackendRepos {
	private event = dbClient.event

	async create(data: { event: Event; artists: ArtistProfileID[] }): Promise<boolean> {
		try {
			const { artists, event } = data
			const { createdBy, date, place, title, text } = event

			await this.event.create({
				data: {
					status: ItemStatusEnum.public,
					createdBy: createdBy as number,
					date: date,
					place: place,
					title: title,
					text: text,
					playAtEvent: {
						createMany: {
							data: artists.map((id) => {
								return {
									artist_id: id,
								}
							}),
						},
					},
				},
			})

			// RESPONSE
			return true
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async edit(data: Event): Promise<boolean> {
		try {
			const { id, createdBy, date, place, title, text } = data

			// persist
			await this.event.update({
				where: {
					id: id as number,
					createdBy: createdBy,
				},
				data: {
					date: date,
					place: place,
					title: title,
					text: text,
				},
			})

			// RESPONSE
			return true
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
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
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async get(id: EventID): Promise<IGetEventSuccess> {
		try {
			const event = await this.event
				.findUniqueOrThrow({
					where: {
						id: id,
					},
					select: {
						id: true,
						createdBy: true,
						date: true,
						place: true,
						title: true,
						text: true,
						imagePath: true,
						playAtEvent: {
							select: {
								artist_id: true,
							},
						},
					},
				})
				.then((event) => {
					const { ["playAtEvent"]: playAtEvent, ...otherDatas } = event

					const artists = playAtEvent.map((item) => {
						return item.artist_id
					})
					return { ...otherDatas, artists }
				})

			return event
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async getAll(): Promise<IGetEventShortSuccess[]> {
		try {
			const events: IGetEventShortSuccess[] = (
				await this.event.findMany({
					select: {
						id: true,
						date: true,
						place: true,
						title: true,
						playAtEvent: {
							select: {
								artist_id: true,
							},
						},
					},
				})
			).map((event) => {
				const { ["playAtEvent"]: playAtEvent, ...otherDatas } = event

				const artists = playAtEvent.map((item) => {
					return item.artist_id
				})
				return { ...otherDatas, artists }
			})

			return events
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async findByDate(date: Date): Promise<IGetEventShortSuccess[]> {
		try {
			const events: IGetEventShortSuccess[] = (
				await this.event.findMany({
					where: {
						date: date,
					},
					select: {
						id: true,
						date: true,
						place: true,
						title: true,
						playAtEvent: {
							select: {
								artist_id: true,
							},
						},
					},
				})
			).map((event) => {
				const { ["playAtEvent"]: playAtEvent, ...otherDatas } = event

				const artists = playAtEvent.map((item) => {
					return item.artist_id
				})
				return { ...otherDatas, artists }
			})

			return events
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async findByPlace(place: string): Promise<IGetEventShortSuccess[]> {
		try {
			const events: IGetEventShortSuccess[] = (
				await this.event.findMany({
					where: {
						place: place,
					},
					select: {
						id: true,
						date: true,
						place: true,
						title: true,
						playAtEvent: {
							select: {
								artist_id: true,
							},
						},
					},
				})
			).map((event) => {
				const { ["playAtEvent"]: playAtEvent, ...otherDatas } = event

				const artists = playAtEvent.map((item) => {
					return item.artist_id
				})
				return { ...otherDatas, artists }
			})

			return events
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async checkRights(id: number, createdBy: number): Promise<boolean> {
		return await this.event
			.findUnique({
				where: {
					id: id,
					status: ItemStatusEnum.draft || ItemStatusEnum.public,
					createdBy: createdBy,
				},
			})
			.then((data) => {
				if (!data) return false
				else return true
			})
	}

	async getImagePath(id: EventID): Promise<string | null> {
		try {
			const { imagePath } = await this.event.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					imagePath: true,
				},
			})
			return imagePath
		} catch (error) {
			throw DatabaseErrorHandler.handle(error).setMessage("error getting image path")
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
			throw DatabaseErrorHandler.handle(error).setMessage("error to get image path")
		}
	}
}
