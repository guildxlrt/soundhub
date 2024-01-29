import * as fs from "fs"
import { ErrorHandler, ReleaseFolder } from "Shared"
import { File, StorageRepository } from "Domain"

export class StorageImplement implements StorageRepository {
	async move(file: File, destination: string): Promise<string> {
		try {
			const path = file.path
			const newPath = destination + file?.filename

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
			const folderName = ReleaseFolder.generateRandom()

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
}
