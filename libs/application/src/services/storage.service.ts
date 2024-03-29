import { StreamFile, StorageRepository } from "Domain"
import { ErrorHandler } from "Shared"

export class StorageService implements StorageRepository {
	readonly service: StorageRepository

	constructor(service: StorageRepository) {
		this.service = service
	}

	async move(file: StreamFile, destination: string, newFileName?: string): Promise<string> {
		try {
			return await this.service.move(file, destination, newFileName)
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
	async mkdir(): Promise<string> {
		try {
			return await this.service.mkdir()
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async rmdir(directoryPath: string): Promise<boolean> {
		try {
			return await this.service.rmdir(directoryPath)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
