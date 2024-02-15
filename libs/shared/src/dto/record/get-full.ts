import { IGetFullRecordSuccess } from "../../replies"
import { IArtistName } from "../../types"

interface RecordDTO {
	readonly id: number
	readonly createdAt: Date
	readonly createdBy: number
	readonly title: string
	readonly recordType: string
	readonly descript: string | null
	readonly price: number | null
	readonly genres: string[]
	readonly folderPath: string | null
	readonly status: string
	readonly artists: IArtistName[]
}

interface SongDTO {
	readonly id: number
	readonly title: string
	readonly audioPath: string
	readonly feats: IArtistName[]
	readonly lyrics: string | null
}

export class GetFullRecordDTO {
	readonly record: RecordDTO
	readonly songs: SongDTO[]

	constructor(record: RecordDTO, songs: SongDTO[]) {
		this.record = record
		this.songs = songs
	}

	static createFromData(
		record: IGetFullRecordSuccess,
		artists: IArtistName[],
		songsWithFeats: {
			feats: IArtistName[]
			id: number
			title: string
			audioPath: string
			lyrics: string | null
		}[]
	) {
		const cleanRecord = {
			...record,
			artists,
		}

		return new GetFullRecordDTO(cleanRecord, songsWithFeats)
	}
}
