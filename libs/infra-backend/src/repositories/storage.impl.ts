import * as fs from "fs"
import { ErrorHandler, RecordFolder } from "Shared"
import { StreamFile, StorageRepository } from "Domain"

export class StorageImplement implements StorageRepository {
	async move(file: StreamFile, destination: string, newFileName?: string): Promise<string> {
		try {
			const filename = newFileName ? newFileName : file?.filename
			const path = file.path
			const newPath = destination + filename

			return await fs.promises
				.rename(path, newPath)
				.then(() => {
					return newPath
				})
				.catch((error) => {
					throw ErrorHandler.handle(error)
				})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async delete(filePath: string): Promise<boolean> {
		try {
			return await fs.promises
				.unlink(filePath)
				.then(() => {
					return true
				})
				.catch((error) => {
					throw ErrorHandler.handle(error)
				})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async mkdir(): Promise<string> {
		try {
			const folderName = RecordFolder.generateRandom()

			return await fs.promises
				.mkdir(folderName, { recursive: true })
				.then(() => {
					return folderName
				})
				.catch((error) => {
					throw ErrorHandler.handle(error)
				})
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	async rmdir(directoryPath: string): Promise<boolean> {
		try {
			await fs.promises.rmdir(directoryPath, { recursive: true })

			return true
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
