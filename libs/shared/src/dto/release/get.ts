import { AnyObject } from "../../types"

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
	readonly featuring: number[]
	readonly lyrics: string | null
}

export class GetReleaseDTO {
	readonly release: ReleaseDTO
	readonly songs: SongDTO

	constructor(release: ReleaseDTO, songs: SongDTO) {
		this.release = release
		this.songs = songs
	}

	static createFromData(data: AnyObject) {
		const cleanRelease = {
			id: data?.["id"],
			createdAt: data?.["createdAt"],
			owner_id: data?.["owner_id"],
			title: data?.["title"],
			releaseType: data?.["releaseType"],
			descript: data?.["descript"],
			price: data?.["price"],
			genres: data?.["genres"],
			coverPath: data?.["coverPath"],
			isPublic: data?.["isPublic"],
		}

		const songs = data?.["songs"]
		const cleanSongs = songs.map((song: AnyObject) => {
			return {
				id: song?.["id"],
				title: song?.["title"],
				audioPath: song?.["audioPath"],
				featuring: data?.["featuring"],
				lyrics: data?.["lyrics"],
			}
		})
		return new GetReleaseDTO(cleanRelease, cleanSongs)
	}
}
