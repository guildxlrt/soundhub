import { ArtistId, GenresArray, ReleaseId, ReleaseType, SongId } from "Shared-utils"

// SONG
export interface ISong {
	readonly id: SongId
	release_id: ReleaseId
	title: string
	audioUrl: string
	featuring: number[] | null
	lyrics?: string | undefined
}

// PRICE
export interface INewPrice {
	id: ReleaseId
	newAmount: number
}

// RELEASE
export interface INewRelease {
	artist_id: ArtistId
	title: string
	releaseType: ReleaseType
	descript: string | null
	price: number | null
	genres: GenresArray
	songs: SongId[]
	cover?: File
}

export interface IRelease {
	artist_id: ArtistId
	title: string
	releaseType: ReleaseType
	descript: string | null
	price: number | null
	genres: GenresArray
	songs: SongId[]
	cover?: File
}
