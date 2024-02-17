import { filePath } from "../config/file-path"

export class RecordFolder {
	static fromFullPath(imagePath: string): string {
		const splited = imagePath.split("/")
		const recordFolder = splited[2] + "/"

		return filePath.store.record + recordFolder
	}

	static generateRandom(): string {
		const randomString = Math.random().toString(36).substring(7)
		const addDate = `${Date.now()}_${randomString}/`

		return filePath.store.record + addDate
	}
}
