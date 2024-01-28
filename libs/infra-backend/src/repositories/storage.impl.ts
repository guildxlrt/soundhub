import * as fs from "fs"
import { ErrorMsg, StoreFilePath, htmlError } from "Shared"
import { File, StorageRepository } from "Domain"

export class StorageImplement implements StorageRepository {
	async move(file: File, destination: string): Promise<string> {
		try {
			const path = file.path
			const newPath = destination + file?.filename

			return await fs.promises
				.rename(path, newPath)
				.then(() => {
					return destination
				})
				.catch((error) => {
					throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
				})
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
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
					throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
				})
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}

	async mkdir(storeFolder: StoreFilePath, name?: string): Promise<string> {
		try {
			const folderName = name ? name : Math.floor(Math.random() * 999999)
			const folderPath = storeFolder + folderName

			return await fs.promises
				.mkdir(folderPath, { recursive: true })
				.then(() => {
					return folderPath + "/"
				})
				.catch((error) => {
					throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
				})
		} catch (error) {
			throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
}
