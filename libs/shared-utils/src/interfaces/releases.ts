import { ArtistId, GenresArray, ReleaseId, ReleaseType, SongId } from "Shared-utils"

// PRICE
export interface INewPrice {
	id: ReleaseId
	newAmount: number
}

// RELEASE
export interface IRelease {
	id: ReleaseId
	artist_id: ArtistId
	title: string
	releaseType: ReleaseType
	descript: string | null
	price: number | null
	genres: GenresArray
	songs_list: SongId[]
	coverUrl: string | null
}

export interface INewRelease {
	artist_id: ArtistId
	title: string
	releaseType: ReleaseType
	descript: string | null
	price: number | null
	genres: string[]
	cover: boolean
	songs_array: {
		// audio: File
		title: string
		featuring: number[]
		lyrics: string | null
	}[]
}
