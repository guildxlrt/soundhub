import { RecordsBackendRepos } from "Domain"
import { Record } from "Domain"
import {
	GenreType,
	RecordID,
	GetShortRecordDTO,
	RecordType,
	IGetFullRecordSuccess,
	ArtistProfileID,
} from "Shared"
import { dbClient } from "../database"
import { DatabaseErrorHandler } from "../utils"

export class RecordsImplement implements RecordsBackendRepos {
	private record = dbClient.record
	private song = dbClient.song

	async create(data: { record: Record; artists: ArtistProfileID[] }): Promise<true> {
		try {
			const { record, artists } = data
			const { publisher_id, title, recordType, descript, price, genres, folderPath } = record

			// PERSIST
			await this.record.create({
				data: {
					publisher_id: publisher_id,
					title: title,
					recordType: recordType as RecordType,
					descript: descript,
					price: price,
					genres: [`${genres[0]}`, `${genres[1]}`, `${genres[2]}`],
					isPublic: false,
					isReadOnly: false,
					folderPath: folderPath as string,
					recordsArtists: {
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

			return true
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async edit(record: Record): Promise<boolean> {
		try {
			const { id, publisher_id, price, descript, genres, title } = record

			// persist
			await this.record.update({
				where: {
					id: id as number,
					publisher_id: publisher_id,
				},
				data: {
					title: title,
					price: price,
					descript: descript,
					genres: genres as string[],
				},
			})

			return true
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async delete(id: number): Promise<boolean> {
		try {
			// persist
			await this.record.delete({
				where: {
					id: id,
				},
			})

			return true
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async publish(id: RecordID) {
		try {
			// persist
			await this.record
				.update({
					where: {
						id: id as number,
					},
					data: {
						isPublic: true,
						isReadOnly: true,
					},
				})
				.then(async (data) => {
					await this.song.updateMany({
						where: {
							record_id: data.id,
						},
						data: {
							isReadOnly: true,
						},
					})
				})

			return true
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async setPublicStatus(id: RecordID, isPublic: boolean): Promise<boolean> {
		try {
			await this.record.update({
				where: {
					id: id,
				},
				data: {
					isPublic: isPublic,
				},
			})

			return true
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async get(id: RecordID): Promise<IGetFullRecordSuccess> {
		try {
			const data = await this.record.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					id: true,
					createdAt: true,
					publisher_id: true,
					title: true,
					recordType: true,
					descript: true,
					price: true,
					genres: true,
					folderPath: true,
					isPublic: true,
					songs: {
						select: {
							id: true,
							title: true,
							lyrics: true,
							audioPath: true,
						},
					},
				},
			})

			return data
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async getAll(): Promise<GetShortRecordDTO[]> {
		try {
			const data = await this.record.findMany({
				select: {
					id: true,
					publisher_id: true,
					title: true,
					recordType: true,
					genres: true,
				},
				where: {
					isPublic: true,
				},
			})

			return GetShortRecordDTO.createArrayFromData(data)
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async findByGenre(genre: GenreType): Promise<GetShortRecordDTO[]> {
		try {
			const data = await this.record.findMany({
				where: {
					genres: { has: genre },
					isPublic: true,
				},
				select: {
					id: true,
					publisher_id: true,
					title: true,
					recordType: true,
					genres: true,
				},
			})
			return GetShortRecordDTO.createArrayFromData(data)
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async findByDate(date: Date): Promise<GetShortRecordDTO[]> {
		try {
			const data = await this.record.findMany({
				where: {
					createdAt: date,
					isPublic: true,
				},
				select: {
					id: true,
					publisher_id: true,
					title: true,
					recordType: true,
					genres: true,
				},
			})
			return GetShortRecordDTO.createArrayFromData(data)
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async findByRecordType(type: RecordType): Promise<GetShortRecordDTO[]> {
		try {
			const data = await this.record.findMany({
				where: {
					recordType: type,
					isPublic: true,
				},
				select: {
					id: true,
					publisher_id: true,
					title: true,
					recordType: true,
					genres: true,
				},
			})

			return GetShortRecordDTO.createArrayFromData(data)
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async getEditability(id: RecordID): Promise<boolean> {
		try {
			const { isReadOnly } = await this.record.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					isReadOnly: true,
				},
			})
			return isReadOnly
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async getOwner(id: ArtistProfileID): Promise<number | undefined> {
		try {
			const { publisher_id } = await this.record.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					publisher_id: true,
				},
			})
			return publisher_id
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async getPublicStatus(id: RecordID): Promise<boolean> {
		try {
			const { isPublic } = await this.record.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					isPublic: true,
				},
			})

			return isPublic
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async getFolderPath(recordID: RecordID): Promise<string | null> {
		try {
			const { folderPath } = await this.record.findUniqueOrThrow({
				where: {
					id: recordID as number,
				},
				select: {
					folderPath: true,
				},
			})

			return folderPath
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}
}
