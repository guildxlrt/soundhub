import { GenresArray, IAnyObject, ReleaseType } from "../types"

export class PostReleaseDTO {
	readonly release: {
		readonly title: string
		readonly releaseType: ReleaseType
		readonly descript: string | null
		readonly price: null | number
		readonly genres: GenresArray
	}
	readonly songs: {
		readonly title: string
		readonly featuring: number[]
		readonly lyrics: string | null
	}[]

	constructor(
		release: {
			title: string
			releaseType: ReleaseType
			descript: string | null
			price: null | number
			genres: GenresArray
		},
		songs: {
			title: string
			featuring: number[]
			lyrics: string | null
		}[]
	) {
		this.release = release
		this.songs = songs
	}

	static createFromInput(release: IAnyObject, songs: IAnyObject[]) {
		const cleanRelease = {
			title: release?.["title"],
			releaseType: release?.["releaseType"],
			descript: release?.["descript"],
			price: release?.["price"],
			genres: release?.["genres"],
		}
		const cleanSongs = songs.map((data) => {
			return {
				title: data?.["title"],
				featuring: data?.["featuring"],
				lyrics: data?.["lyrics"],
			}
		})
		return new PostReleaseDTO(cleanRelease, cleanSongs)
	}
}

export class EditReleaseReqDTO {
	readonly release: {
		readonly descript: string | null
		readonly price: null | number
		readonly genres: GenresArray
	}
	readonly songs: {
		readonly title: string
		readonly featuring: number[]
		readonly lyrics: string | null
	}[]

	constructor(
		release: {
			descript: string | null
			price: null | number
			genres: GenresArray
		},
		songs: {
			title: string
			featuring: number[]
			lyrics: string | null
		}[]
	) {
		this.release = release
		this.songs = songs
	}

	static createFromInput(release: IAnyObject, songs: IAnyObject[]) {
		const cleanRelease = {
			descript: release?.["descript"],
			price: release?.["price"],
			genres: release?.["genres"],
		}
		const cleanSongs = songs.map((data) => {
			return {
				title: data?.["title"],
				featuring: data?.["featuring"],
				lyrics: data?.["lyrics"],
			}
		})
		return new EditReleaseReqDTO(cleanRelease, cleanSongs)
	}
}

export class ReleaseDTO {
	readonly release: {
		readonly id: number
		readonly owner_id: number
		readonly title: string
		readonly releaseType: ReleaseType
		readonly descript: string | null
		readonly price: null | number
		readonly genres: GenresArray
		readonly coverPath: string | null
	}
	readonly songs: {
		readonly id: number
		readonly title: string
		readonly audioPath: string
		readonly featuring: number[]
		readonly lyrics: string
	}[]

	constructor(
		release: {
			id: number
			owner_id: number
			title: string
			releaseType: ReleaseType
			descript: string | null
			price: null | number
			genres: GenresArray
			coverPath: string | null
		},
		songs: {
			id: number
			title: string
			audioPath: string
			featuring: number[]
			lyrics: string
		}[]
	) {
		this.release = release
		this.songs = songs
	}

	static createFromData(data: IAnyObject) {
		const songs = data?.["songs"]

		const cleanRelease = {
			id: data?.["id"],
			owner_id: data?.["owner_id"],
			title: data?.["title"],
			releaseType: data?.["releaseType"],
			descript: data?.["descript"],
			price: data?.["price"],
			genres: data?.["genres"],
			coverPath: data?.["coverPath"],
		}
		const cleanSongs = songs.map((song: IAnyObject) => {
			return {
				id: song?.["id"],
				title: song?.["title"],
				audioPath: song?.["audioPath"],
				featuring: data?.["featuring"],
				lyrics: data?.["lyrics"],
			}
		})
		return new ReleaseDTO(cleanRelease, cleanSongs)
	}
}

export class ReleaseShortDTO {
	readonly id: number
	readonly title: string
	readonly releaseType: ReleaseType
	readonly genres: GenresArray

	constructor(id: number, title: string, releaseType: ReleaseType, genres: GenresArray) {
		this.id = id
		this.title = title
		this.releaseType = releaseType
		this.genres = genres
	}

	static createFromData(data: IAnyObject): ReleaseShortDTO {
		return new ReleaseShortDTO(
			data?.["id"],
			data?.["title"],
			data?.["releaseType"],
			data?.["genres"]
		)
	}

	static createArrayFromData(data: IAnyObject[]): ReleaseShortDTO[] {
		return data.map((release): ReleaseShortDTO => {
			return new ReleaseShortDTO(
				release?.["id"],
				release?.["title"],
				release?.["releaseType"],
				release?.["genres"]
			)
		})
	}
}
