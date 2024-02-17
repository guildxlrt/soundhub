import { ExtBackRecordsRepos, ExtFrontRecordsRepos, RecordsRepository } from "Domain"
import {
	RecordID,
	GetShortRecordDTO,
	GenreType,
	ErrorHandler,
	RecordType,
	ItemStatusType,
} from "Shared"

interface IRecordsService extends RecordsRepository, ExtBackRecordsRepos, ExtFrontRecordsRepos {}

export class RecordsService implements IRecordsService {
	private service: IRecordsService

	constructor(service: IRecordsService) {
		this.service = service
	}

	// SERVIVES
	async create(record: unknown): Promise<boolean> {
		try {
			return await this.service.create(record)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async edit(record: unknown): Promise<boolean> {
		try {
			return await this.service.edit(record)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async delete(id: RecordID): Promise<boolean> {
		try {
			return await this.service.delete(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async setStatus(id: RecordID, status: ItemStatusType): Promise<boolean> {
		try {
			return await this.service.setStatus(id, status)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async get(id: RecordID): Promise<unknown> {
		try {
			return await this.service.get(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async search(genre: GenreType, date: Date, type: RecordType): Promise<GetShortRecordDTO[]> {
		try {
			return await this.service.search(genre, date, type)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	// BACKEND
	async checkRights(id: number, createdBy: number): Promise<boolean> {
		try {
			return await this.service.checkRights(id, createdBy)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getFolderPath(recordID: RecordID): Promise<string | null | undefined> {
		try {
			return await this.service.getFolderPath(recordID)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
