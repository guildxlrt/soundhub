import { ErrorMsg, htmlError } from "Shared"
import * as fs from "fs"
import { StoreFilePath } from "../assets"

const error = (error: unknown) => {
	throw ErrorMsg.htmlError(htmlError[500]).treatError(error)
}

export class FileManipulator {
	static async move(location: string, destination: string) {
		return await fs.promises
			.rename(location, destination)
			.then(() => {
				return destination
			})
			.catch(error)
	}
	static async delete(filePath: string) {
		await fs.promises.unlink(filePath).catch(error)
	}
	static async newFolder(storeFolder: StoreFilePath) {
		const folderName = Math.floor(Math.random() * 999999) + "/"
		const folderPath = storeFolder + folderName

		return await fs.promises
			.mkdir(storeFolder, { recursive: true })
			.then(() => {
				return folderPath
			})
			.catch(error)
	}
	static getReleaseFolder(full: string) {
		const splitted = full.split("storage/releases/")
		const final = splitted[1].split("/")
		return final[0] + "/"
	}
}
