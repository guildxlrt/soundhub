import { StreamFile } from "../entities"

export interface StorageRepository {
	move(file: StreamFile, destination: string): Promise<string>
	delete(filePath: string): Promise<boolean>
	mkdir(): Promise<string>
}
