import { IGetFullSongSuccess } from "../../replies"
import { IArtistName } from "../../types"

export class GetFullSongDTO {
	readonly id: number
	readonly record_id: number
	readonly title: string
	readonly audioPath: string
	readonly feats: IArtistName[]

	constructor(
		id: number,
		record_id: number,
		title: string,
		audioPath: string,
		feats: IArtistName[]
	) {
		this.id = id
		this.title = title
		this.record_id = record_id
		this.audioPath = audioPath
		this.feats = feats
	}

	static createFromData(data: IGetFullSongSuccess, feats: IArtistName[]): GetFullSongDTO {
		return new GetFullSongDTO(data?.id, data?.record_id, data?.title, data?.audioPath, feats)
	}
}
