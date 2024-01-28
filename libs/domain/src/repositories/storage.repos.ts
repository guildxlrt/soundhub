import { File } from "../entities"

export interface StorageRepository {
	move(file: File, destination: string): Promise<string>
	delete(filePath: string): Promise<boolean>
	mkdir(storeFolder: string, name?: string): Promise<string>
}
