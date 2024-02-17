import { RecordArtistRepository } from "Domain"
import { ArtistProfileID, GetShortRecordDTO, IArtistName, ItemStatusEnum, RecordID } from "Shared"
import { dbClient } from "../database"
import { DatabaseErrorHandler } from "../utils"

export class RecordArtistImplement implements RecordArtistRepository {
	private relation = dbClient.recordArtist
	private record = dbClient.record

	async addArtists(data: { artists: ArtistProfileID[]; record: RecordID }): Promise<boolean> {
		try {
			const { artists, record } = data

			return await this.relation
				.createMany({
					data: artists.map((id) => {
						return {
							artist_id: id,
							record_id: record,
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
	async removeArtists(data: { artists: ArtistProfileID[]; record: RecordID }): Promise<boolean> {
		try {
			const { artists, record } = data

			return await this.relation
				.deleteMany({
					where: {
						AND: [
							{
								record_id: record,
							},
							{
								artist_id: artists[0],
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

	async search(id: ArtistProfileID): Promise<GetShortRecordDTO[]> {
		try {
			const data = (
				await this.relation.findMany({
					where: {
						artist_id: id,
					},
					select: {
						record_id: true,
					},
				})
			).map(async (relation) => {
				const data = await this.record.findUnique({
					where: {
						id: relation.record_id,
						status: ItemStatusEnum.public,
					},
					select: {
						id: true,
						title: true,
						recordType: true,
						genres: true,
					},
				})

				return data
			})

			return GetShortRecordDTO.createArrayFromData(data)
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async getArtistsNames(id: RecordID): Promise<IArtistName[]> {
		try {
			const data = (
				await this.relation.findMany({
					where: {
						record_id: id,
					},
					select: {
						artist: {
							select: { id: true, name: true },
						},
					},
				})
			).map((result) => {
				const { name, id } = result.artist
				return {
					name: name,
					id: id,
				}
			})

			return data
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async checkRights(record: number, authID: number): Promise<boolean> {
		return await this.relation
			.findFirst({
				where: {
					record_id: record,
					record: { createdBy: authID },
				},
			})
			.then((data) => {
				if (!data) return false
				else return true
			})
	}
}
