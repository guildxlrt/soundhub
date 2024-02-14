import { IGetFullReleaseSuccess } from "../../replies"
import { IArtistName } from "../../types"

interface ReleaseDTO {
	readonly id: number
	readonly createdAt: Date
	readonly publisher_id: number
	readonly title: string
	readonly releaseType: string
	readonly descript: string | null
	readonly price: number | null
	readonly genres: string[]
	readonly folderPath: string | null
	readonly isPublic: boolean
	readonly artists: IArtistName[]
}

interface SongDTO {
	readonly id: number
	readonly title: string
	readonly audioPath: string
	readonly feats: IArtistName[]
	readonly lyrics: string | null
}

export class GetFullReleaseDTO {
	readonly release: ReleaseDTO
	readonly songs: SongDTO[]

	constructor(release: ReleaseDTO, songs: SongDTO[]) {
		this.release = release
		this.songs = songs
	}

	static createFromData(
		release: IGetFullReleaseSuccess,
		artists: IArtistName[],
		songsWithFeats: {
			feats: IArtistName[]
			id: number
			title: string
			audioPath: string
			lyrics: string | null
		}[]
	) {
		const cleanRelease = {
			...release,
			artists,
		}

		return new GetFullReleaseDTO(cleanRelease, songsWithFeats)
	}
}
