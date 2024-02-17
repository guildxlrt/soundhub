import { IFullLabel } from "../../replies"
import { IArtistName } from "../../types"

interface LabelDTO {
	readonly id: number
	readonly status: string
	readonly name: string
	readonly creationDate: Date
	readonly bio: string | null
	readonly website: string | null
	readonly country: string | null
	readonly logoPath: string | null
	readonly artists: IArtistName[]
}

interface SongDTO {
	readonly id: number
	readonly title: string
	readonly audioPath: string
	readonly feats: IArtistName[]
	readonly lyrics: string | null
}

export class GetFullLabelDTO {
	readonly label: LabelDTO
	readonly songs: SongDTO[]

	constructor(label: LabelDTO, songs: SongDTO[]) {
		this.label = label
		this.songs = songs
	}

	static createFromData(
		label: IFullLabel,
		artists: IArtistName[],
		songsWithFeats: {
			feats: IArtistName[]
			id: number
			title: string
			audioPath: string
			lyrics: string | null
		}[]
	) {
		const cleanLabel = {
			...label,
			artists,
		}

		return new GetFullLabelDTO(cleanLabel, songsWithFeats)
	}
}
