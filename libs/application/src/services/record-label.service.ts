import { ExtBackRecordLabelRepos, ExtFrontRecordLabelRepos, RecordLabelRepository } from "Domain"
import { ErrorHandler, ILabelName, LabelID, RecordID } from "Shared"

interface IRecordLabelService
	extends RecordLabelRepository,
		ExtBackRecordLabelRepos,
		ExtFrontRecordLabelRepos {}

export class RecordLabelService implements IRecordLabelService {
	private service: IRecordLabelService

	constructor(service: IRecordLabelService) {
		this.service = service
	}

	async add(data: { label: LabelID; record: RecordID }): Promise<boolean> {
		try {
			return await this.service.add(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async edit(data: { label: LabelID; record: RecordID }): Promise<boolean> {
		try {
			return await this.service.add(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async remove(id: RecordID): Promise<boolean> {
		try {
			return await this.service.remove(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async getLabelOfRecord(id: RecordID): Promise<ILabelName> {
		try {
			return await this.service.getLabelOfRecord(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	// BACKEND
	async checkRights(id: number, authID: number): Promise<boolean> {
		try {
			return await this.service.checkRights(id, authID)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
