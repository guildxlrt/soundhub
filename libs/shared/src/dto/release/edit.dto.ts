import { AnyObject } from "../../types"

interface UpdateReleaseDTO {
	readonly id: number
	readonly title: string
	readonly descript: string | null
	readonly price: number | null
	readonly genres: string[]
}

interface UpdateSongDTO {
	readonly id: number
	readonly title: string
	readonly featuring: number[]
	readonly lyrics: string | null
}

export class EditReleaseDTO {
	readonly release: UpdateReleaseDTO
	readonly songs: UpdateSongDTO[]
	readonly delCover?: boolean

	constructor(release: UpdateReleaseDTO, songs: UpdateSongDTO[], delCover?: boolean) {
		this.release = release
		this.songs = songs
		this.delCover = delCover
	}

	static createFromInput(release: AnyObject, songs: AnyObject[]) {
		const cleanRelease: UpdateReleaseDTO = {
			id: release?.["id"],
			title: release?.["title"],
			descript: release?.["descript"],
			price: release?.["price"],
			genres: release?.["genres"],
		}
		const cleanSongs: UpdateSongDTO[] = songs.map((data) => {
			return {
				id: data?.["id"],
				title: data?.["title"],
				featuring: data?.["featuring"],
				lyrics: data?.["lyrics"],
			}
		})
		return new EditReleaseDTO(cleanRelease, cleanSongs)
	}
}
