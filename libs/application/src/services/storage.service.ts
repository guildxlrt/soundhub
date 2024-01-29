import { File, StorageRepository } from "Domain"
import { ErrorHandler } from "Shared"

export class StorageService implements StorageRepository {
	readonly service: StorageRepository

	constructor(service: StorageRepository) {
		this.service = service
	}

	async move(file: File, destination: string): Promise<string> {
		try {
			return await this.service.move(file, destination)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async delete(filePath: string): Promise<boolean> {
		try {
			return await this.service.delete(filePath)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
	async mkdir(storeFolder: string, name?: string): Promise<string> {
		try {
			return await this.service.mkdir(storeFolder, name)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}