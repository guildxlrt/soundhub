import { ErrorHandler, FileValidator, Stream } from "Shared"
import { StorageRepository } from "../repositories"

export type RawFile = Blob
export type File = StreamFile | RawFile

export class StreamFile extends Stream {
	private validator = new FileValidator()

	async move(storage: StorageRepository, destination: string): Promise<string> {
		try {
			return await storage.move(this, destination)
		} catch (error) {
			await storage.delete(this.path)
			throw new ErrorHandler("Error: failed to store").handle(error)
		}
	}

	async delete(storage: StorageRepository): Promise<boolean> {
		try {
			return await storage.delete(this.path)
		} catch (error) {
			throw new ErrorHandler("Error: failed to delete file").handle(error)
		}
	}

	validateAudio() {
		try {
			return this.validator.validate(this, "audio")
		} catch (error) {
			throw new ErrorHandler("Error: failed to validate audiofile").handle(error)
		}
	}

	validateImage() {
		try {
			return this.validator.validate(this, "image")
		} catch (error) {
			throw new ErrorHandler("Error: failed to validate image file").handle(error)
		}
	}
}
