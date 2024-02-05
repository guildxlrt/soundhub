import { AnyObject, IArtistName } from "../../types"

interface ReleaseDTO {
	readonly id: number
	readonly createdAt: Date
	readonly owner_id: number
	readonly title: string
	readonly releaseType: string
	readonly descript: string | null
	readonly price: number | null
	readonly genres: string[]
	readonly coverPath: string | null
	readonly isPublic: boolean
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

	static createFromData(release: AnyObject, songs: AnyObject[]) {
		const cleanRelease = {
			id: release?.["id"],
			createdAt: release?.["createdAt"],
			owner_id: release?.["owner_id"],
			title: release?.["title"],
			releaseType: release?.["releaseType"],
			descript: release?.["descript"],
			price: release?.["price"],
			genres: release?.["genres"],
			coverPath: release?.["coverPath"],
			isPublic: release?.["isPublic"],
		}

		const cleanSongs = songs?.["map"]((song: AnyObject) => {
			const feats: AnyObject[] = song?.["feats"]

			const cleanFeat = feats.map((member) => {
				return {
					name: member?.["name"],
					id: member?.["id"],
				}
			})

			return {
				id: song?.["id"],
				title: song?.["title"],
				audioPath: song?.["audioPath"],
				feats: cleanFeat,
				lyrics: song?.["lyrics"],
			}
		})
		return new GetFullReleaseDTO(cleanRelease, cleanSongs)
	}
}
