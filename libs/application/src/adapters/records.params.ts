import {
	EditRecordDTO,
	GenresArray,
	PostRecordDTO,
	ArtistProfileID,
	RecordID,
	RecordType,
	ItemStatusType,
} from "Shared"
import { StreamFile, Record } from "Domain"

export class NewRecordUsecaseParams {
	data: Record
	artistsIDs: ArtistProfileID[]
	cover?: StreamFile

	constructor(data: Record, artistsIDs: ArtistProfileID[], cover?: StreamFile) {
		this.data = data
		this.cover = cover
		this.artistsIDs = artistsIDs
	}

	static fromBackend(dto: PostRecordDTO, user: number, cover?: StreamFile | unknown) {
		const { status, title, recordType, descript, price, genres, artistsIDs } = dto
		const recordData = new Record(
			null,
			user,
			status as ItemStatusType,
			title,
			recordType as RecordType,
			descript,
			price,
			genres as GenresArray,
			null
		)

		return new NewRecordUsecaseParams(recordData, artistsIDs, cover as StreamFile)
	}
}

export class EditRecordUsecaseParams {
	data: Record
	cover?: StreamFile
	delCover?: boolean

	constructor(data: Record, cover?: StreamFile, delCover?: boolean) {
		this.data = data
		this.cover = cover
		this.delCover = delCover
	}

	static fromBackend(dto: EditRecordDTO, userID: number, cover?: StreamFile | unknown) {
		const delCover = dto.delCover
		const { title, price, descript, genres, id } = dto.record
		const recordData = new Record(
			id,
			userID,
			null,
			title,
			null,
			descript,
			price,
			genres as GenresArray,
			null
		)

		return new EditRecordUsecaseParams(recordData, cover as StreamFile, delCover)
	}
}

export class DeleteRecordUsecaseParams {
	id: RecordID
	authID?: ArtistProfileID

	constructor(id: RecordID, authID?: ArtistProfileID) {
		this.id = id
		this.authID = authID
	}

	static fromBackend(id: number | string, authID: ArtistProfileID) {
		const recordID = typeof id === "string" ? Number(id) : id
		return new DeleteRecordUsecaseParams(recordID, authID)
	}
}

export class SetStatusRecordUsecaseParams {
	id: RecordID
	status: ItemStatusType
	authID?: ArtistProfileID

	constructor(id: RecordID, status: ItemStatusType, authID?: ArtistProfileID) {
		this.id = id
		this.authID = authID
		this.status = status
	}

	static fromBackend(id: number | string, status: ItemStatusType, authID: ArtistProfileID) {
		const recordID = typeof id === "string" ? Number(id) : id
		return new SetStatusRecordUsecaseParams(recordID, status, authID)
	}
}

export class RecordArtistUsecaseParams {
	record: number
	artists: number[]
	authID?: number

	constructor(record: number, artists: number[], authID?: number) {
		this.artists = artists
		this.record = record
		this.authID = authID
	}
}

export class RecordLabelUsecaseParams {
	record: number
	label: number
	authID?: number

	constructor(record: number, label: number, authID?: number) {
		this.record = record
		this.label = label
		this.authID = authID
	}
}

export class RemoveRecordLabelUsecaseParams {
	record: number
	authID?: number

	constructor(record: number, label: number, authID?: number) {
		this.record = record
		this.authID = authID
	}
}
