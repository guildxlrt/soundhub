import { PlayAtEventRepository } from "Domain"
import { ArtistProfileID, EventID, GenreType, IGetEventShortSuccess } from "Shared"
import { DatabaseErrorHandler } from "../utils"
import { dbClient } from "../database"

export class PlayAtEventImplement implements PlayAtEventRepository {
	private relation = dbClient.playAtEvent
	private artist = dbClient.artist

	async addArtists(artistsIDs: ArtistProfileID[], eventID: EventID): Promise<boolean> {
		try {
			return await this.relation
				.createMany({
					data: artistsIDs.map((id) => {
						return {
							artist_id: id,
							event_id: eventID,
						}
					}),
				})
				.then(() => {
					return true
				})
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}
	async deleteArtists(artistsIDs: ArtistProfileID[], eventID: EventID): Promise<boolean> {
		try {
			return await this.relation
				.deleteMany({
					where: {
						AND: [
							{
								event_id: eventID,
							},
							{
								artist_id: artistsIDs[0],
							},
						],
					},
				})
				.then(() => {
					return true
				})
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async findEventsByArtist(id: EventID): Promise<IGetEventShortSuccess[]> {
		try {
			const ArtistProfileID = id

			const result = (
				await this.relation.findMany({
					where: {
						artist_id: ArtistProfileID,
					},
					select: {
						event: {
							select: {
								id: true,
								date: true,
								place: true,

								title: true,
								imagePath: true,
							},
						},
					},
				})
			).map((item) => {
				return item.event
			})

			return result
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async findEventsByArtistGenre(genre: GenreType): Promise<IGetEventShortSuccess[]> {
		try {
			const artists = (
				await this.artist.findMany({
					where: {
						genres: { has: genre },
					},
					select: {
						id: true,
					},
				})
			).map((artist) => artist.id)

			const results = await Promise.all(
				artists.map(async (id) => {
					return (
						await this.relation.findMany({
							where: {
								artist_id: id,
							},
							select: {
								event: {
									select: {
										id: true,
										date: true,
										place: true,

										title: true,
									},
								},
							},
						})
					).map((item) => {
						return item.event
					})
				})
			)

			const flat = results.flat(Infinity) as IGetEventShortSuccess[]
			const events = [...new Set(flat)]

			return events
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}
}
