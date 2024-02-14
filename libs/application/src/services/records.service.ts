import { ExtBackRecordsRepos, ExtFrontRecordsRepos, RecordsRepository } from "Domain"
import { RecordID, GetShortRecordDTO, GenreType, ErrorHandler, RecordType } from "Shared"

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

	async publish(id: RecordID): Promise<boolean> {
		try {
			return await this.service.publish(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async getPublicStatus(id: RecordID): Promise<boolean> {
		try {
			return await this.service.getPublicStatus(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async setPublicStatus(id: RecordID, isPublic?: boolean): Promise<boolean> {
		try {
			return await this.service.setPublicStatus(id, isPublic)
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
	async getAll(): Promise<GetShortRecordDTO[]> {
		try {
			return await this.service.getAll()
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async findByGenre(genre: GenreType): Promise<GetShortRecordDTO[]> {
		try {
			return await this.service.findByGenre(genre)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async findByDate(date: Date): Promise<GetShortRecordDTO[]> {
		try {
			return await this.service.findByDate(date)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async findByRecordType(type: RecordType): Promise<GetShortRecordDTO[]> {
		try {
			return await this.service.findByRecordType(type)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	// BACKEND
	async getEditability(id: number): Promise<boolean> {
		try {
			return await this.service.getEditability(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async getOwner(id: number): Promise<number | undefined> {
		try {
			return await this.service.getOwner(id)
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
