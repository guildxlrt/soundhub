import { RecordArtistRepository } from "Domain"
import { ArtistProfileID, GetShortRecordDTO, IArtistName, RecordID } from "Shared"
import { dbClient } from "../database"
import { DatabaseErrorHandler } from "../utils"

export class RecordArtistImplement implements RecordArtistRepository {
	private relation = dbClient.recordArtist
	private record = dbClient.record

	async addArtists(artistsIDs: ArtistProfileID[], recordID: RecordID): Promise<boolean> {
		try {
			return await this.relation
				.createMany({
					data: artistsIDs.map((id) => {
						return {
							artist_id: id,
							record_id: recordID,
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
	async deleteArtists(artistsIDs: ArtistProfileID[], recordID: RecordID): Promise<boolean> {
		try {
			return await this.relation
				.deleteMany({
					where: {
						AND: [
							{
								record_id: recordID,
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

	async findRecordsByArtist(id: ArtistProfileID): Promise<GetShortRecordDTO[]> {
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
						isPublic: true,
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

	async getArtistsNamesOfRecord(id: RecordID): Promise<IArtistName[]> {
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
}
