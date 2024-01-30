import { AnyObject } from "../../types"

interface NewReleaseDTO {
	readonly title: string
	readonly releaseType: string
	readonly descript: string | null
	readonly price: number | null
	readonly genres: string[]
}

interface NewSongDTO {
	readonly title: string
	readonly featuring: number[]
	readonly lyrics: string | null
}

export class PostReleaseDTO {
	readonly release: NewReleaseDTO
	readonly songs: NewSongDTO[]

	constructor(release: NewReleaseDTO, songs: NewSongDTO[]) {
		this.release = release
		this.songs = songs
	}

	static createFromInput(release: AnyObject, songs: AnyObject[]) {
		const cleanRelease: NewReleaseDTO = {
			title: release?.["title"],
			releaseType: release?.["releaseType"],
			descript: release?.["descript"],
			price: release?.["price"],
			genres: release?.["genres"],
		}
		const cleanSongs: NewSongDTO[] = songs.map((data) => {
			return {
				title: data?.["title"],
				featuring: data?.["featuring"],
				lyrics: data?.["lyrics"],
			}
		})
		return new PostReleaseDTO(cleanRelease, cleanSongs)
	}
}
