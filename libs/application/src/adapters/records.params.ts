import {
	EditRecordDTO,
	GenresArray,
	PostRecordDTO,
	ArtistProfileID,
	RecordID,
	RecordType,
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
		const { title, recordType, descript, price, genres, artistsIDs } = dto
		const recordData = new Record(
			null,
			user,
			title,
			recordType as RecordType,
			descript,
			price,
			genres as GenresArray,
			null,
			false,
			true
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
			title,
			null,
			descript,
			price,
			genres as GenresArray,
			null,
			false,
			true
		)

		return new EditRecordUsecaseParams(recordData, cover as StreamFile, delCover)
	}
}

export class PatchDeleteUsecaseParams {
	id: RecordID
	ownerID?: ArtistProfileID

	constructor(id: RecordID, ownerID?: ArtistProfileID) {
		this.id = id
		this.ownerID = ownerID
	}

	static fromBackend(id: number | string, ownerID: ArtistProfileID) {
		const recordID = typeof id === "string" ? Number(id) : id
		return new PatchDeleteUsecaseParams(recordID, ownerID)
	}
}
