import { ExtBackLabelsRepos, ExtFrontLabelsRepos, LabelsRepository } from "Domain"
import { LabelID, ErrorHandler, ItemStatusType } from "Shared"

interface ILabelsService extends LabelsRepository, ExtBackLabelsRepos, ExtFrontLabelsRepos {}

export class LabelsService implements ILabelsService {
	private service: ILabelsService

	constructor(service: ILabelsService) {
		this.service = service
	}

	// SERVIVES
	async create(label: unknown): Promise<boolean> {
		try {
			return await this.service.create(label)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async edit(label: unknown): Promise<boolean> {
		try {
			return await this.service.edit(label)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async setStatus(data: { id: number; status: ItemStatusType }): Promise<boolean> {
		try {
			return await this.service.setStatus(data)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async get(id: LabelID): Promise<unknown> {
		try {
			return await this.service.get(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async search(country: string): Promise<unknown[]> {
		try {
			return await this.service.search(country)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	// BACKEND
	async checkRights(id: LabelID): Promise<boolean> {
		try {
			return await this.service.checkRights(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async getLogoPath(id: LabelID): Promise<string | null> {
		try {
			return await this.service.getLogoPath(id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async setLogoPath(path: string | null, id: LabelID): Promise<boolean> {
		try {
			return await this.service.setLogoPath(path, id)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
