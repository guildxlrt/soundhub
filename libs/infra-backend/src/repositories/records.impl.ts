import { RecordsBackendRepos } from "Domain"
import { Record } from "Domain"
import {
	GenreType,
	RecordID,
	GetShortRecordDTO,
	RecordType,
	IGetFullRecordSuccess,
	ArtistProfileID,
	ItemStatusEnum,
	ItemStatusType,
} from "Shared"
import { dbClient } from "../database"
import { DatabaseErrorHandler } from "../utils"

export class RecordsImplement implements RecordsBackendRepos {
	private record = dbClient.record
	private song = dbClient.song

	async create(data: { record: Record; artists: ArtistProfileID[] }): Promise<true> {
		try {
			const { record, artists } = data
			const { createdBy, title, recordType, descript, price, genres, folderPath } = record

			// PERSIST
			await this.record.create({
				data: {
					createdBy: createdBy,
					title: title,
					recordType: recordType as RecordType,
					descript: descript,
					price: price,
					genres: [`${genres[0]}`, `${genres[1]}`, `${genres[2]}`],
					status: ItemStatusEnum.draft,
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
			const { id, createdBy, price, descript, genres, title } = record

			// persist
			await this.record.update({
				where: {
					id: id as number,
					createdBy: createdBy,
					status: ItemStatusEnum.draft,
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
					status: ItemStatusEnum.draft,
				},
			})

			return true
		} catch (error) {
			throw DatabaseErrorHandler.handle(error)
		}
	}

	async setStatus(id: RecordID, status: ItemStatusType): Promise<boolean> {
		try {
			await this.record.update({
				where: {
					id: id,
				},
				data: {
					status: status,
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
					createdBy: true,
					title: true,
					recordType: true,
					descript: true,
					price: true,
					genres: true,
					folderPath: true,
					status: true,
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
					createdBy: true,
					title: true,
					recordType: true,
					genres: true,
				},
				where: {
					status: ItemStatusEnum.public,
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
					status: ItemStatusEnum.public,
				},
				select: {
					id: true,
					createdBy: true,
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
					status: ItemStatusEnum.public,
				},
				select: {
					id: true,
					createdBy: true,
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
					status: ItemStatusEnum.public,
				},
				select: {
					id: true,
					createdBy: true,
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

	async checkRights(id: number, createdBy: number): Promise<boolean> {
		return await this.record
			.findUnique({
				where: {
					id: id,
					status: ItemStatusEnum.draft,
					createdBy: createdBy,
				},
			})
			.then((data) => {
				if (!data) return false
				else return true
			})
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
