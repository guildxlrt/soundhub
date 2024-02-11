import { ErrorHandler, Stream } from "Shared"
import { StorageRepository } from "../repositories"
import { FileValidator } from "../tools"

export type RawFile = Blob
export type File = StreamFile | RawFile

export class StreamFile extends Stream {
	private validator = new FileValidator()

	async move(
		storage: StorageRepository,
		destination: string,
		newFileName?: string
	): Promise<string> {
		try {
			return await storage.move(this, destination, newFileName)
		} catch (error) {
			await storage.delete(this.path)
			throw ErrorHandler.handle(error, "Error: failed to store")
		}
	}

	async delete(storage: StorageRepository): Promise<boolean> {
		try {
			return await storage.delete(this.path)
		} catch (error) {
			throw ErrorHandler.handle(error, "Error: failed to delete file")
		}
	}

	validateAudio() {
		return this.validator.validate(this, "audio")
	}

	validateImage() {
		return this.validator.validate(this, "image")
	}
}
