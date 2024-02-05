import { filePath } from "../config/file-path"

export class ReleaseFolder {
	static fromFullPath(imagePath: string): string {
		const splited = imagePath.split("/")
		const releaseFolder = splited[2] + "/"

		return filePath.store.release + releaseFolder
	}

	static generateRandom(): string {
		const randomString = Math.random().toString(36).substring(7)
		const addDate = `${Date.now()}_${randomString}/`

		return filePath.store.release + addDate
	}
}
