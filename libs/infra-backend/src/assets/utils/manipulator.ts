import { ErrorMsg } from "Shared"
import * as fs from "fs"

export class FileManipulator {
	static async move(origin: string, store: string) {
		return fs.rename(origin, store, (error) => {
			if (error) return new ErrorMsg("Error: cannot move file", 500)
			else return
		})
	}
	static async delete(origin: string) {
		console.log(origin)
	}
	static randomReleaseFolder() {
		return Math.floor(Math.random() * 999999) + "/"
	}
	static getReleaseFolder(full: string) {
		const splitted = full.split("storage/releases/")
		const final = splitted[1].split("/")
		return final[0] + "/"
	}
}
