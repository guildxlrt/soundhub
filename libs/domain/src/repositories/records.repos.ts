import {
	GenreType,
	GetShortRecordDTO,
	RecordID,
	GetFullRecordDTO,
	IGetFullRecordSuccess,
	RecordType,
	ArtistProfileID,
	ItemStatusType,
} from "Shared"
import { RawFile, Record } from "Domain"

export interface RecordsRepository {
	create(record: unknown): Promise<boolean>
	edit(record: unknown): Promise<boolean>
	delete(id: RecordID): Promise<boolean>
	setStatus(id: RecordID, status: ItemStatusType): Promise<boolean>

	get(id: RecordID): Promise<unknown>
	getAll(): Promise<GetShortRecordDTO[]>
	findByGenre(genre: GenreType): Promise<GetShortRecordDTO[]>
	findByDate(date: Date): Promise<GetShortRecordDTO[]>
	findByRecordType(type: RecordType): Promise<GetShortRecordDTO[]>
}

export interface ExtBackRecordsRepos {
	checkRights(id: number, createdBy: number): Promise<boolean>
	getFolderPath(recordID: RecordID): Promise<string | null | undefined>
}
export interface ExtFrontRecordsRepos {}

export interface RecordsBackendRepos extends RecordsRepository, ExtBackRecordsRepos {
	create(data: { record: Record; artists: ArtistProfileID[] }): Promise<boolean>
	edit(record: Record): Promise<boolean>
	setStatus(id: RecordID, status: ItemStatusType): Promise<boolean>
	get(id: RecordID): Promise<IGetFullRecordSuccess>
}

export interface RecordsFrontendRepos extends RecordsRepository, ExtFrontRecordsRepos {
	create(record: { data: Record; cover: RawFile }): Promise<boolean>
	edit(record: { data: Record; cover?: RawFile }): Promise<boolean>
	get(id: RecordID): Promise<GetFullRecordDTO>
}
