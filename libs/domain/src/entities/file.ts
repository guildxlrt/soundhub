import { ErrorHandler } from "Shared"
import { StorageRepository } from "../repositories"

export class File implements File {
	fieldname: string
	originalname: string
	encoding: string
	mimetype: string
	size: number
	stream: any
	destination: string
	filename: string
	path: string
	buffer: Buffer

	constructor(
		fieldname: string,
		originalname: string,
		encoding: string,
		mimetype: string,
		size: number,
		stream: any,
		destination: string,
		filename: string,
		path: string,
		buffer: Buffer
	) {
		this.fieldname = fieldname
		this.originalname = originalname
		this.encoding = encoding
		this.mimetype = mimetype
		this.size = size
		this.stream = stream
		this.destination = destination
		this.filename = filename
		this.path = path
		this.buffer = buffer
	}

	async move(storage: StorageRepository, destination: string): Promise<string> {
		try {
			return await storage.move(this, destination)
		} catch (error) {
			await storage.delete(this.path)
			throw new ErrorHandler("Error: failed to store").handle(error)
		}
	}

	async delete(storage: StorageRepository) {
		try {
			return await storage.delete(this.path)
		} catch (error) {
			throw new ErrorHandler("Error: failed to delete file").handle(error)
		}
	}
}
