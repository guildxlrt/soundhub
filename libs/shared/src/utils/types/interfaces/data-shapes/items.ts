import { GenresArray, ReleaseType } from "../../enums"
import { ArtistID, ReleaseID } from "../../values"

export interface IEvent {
	id?: number
	owner_id: ArtistID | null
	date: Date
	place: string
	artists: number[]
	title: string
	text: string
	imageUrl: string | null
}

export interface IAnnounce {
	id?: number
	owner_id: ArtistID | null
	title: string
	text: string
	imageUrl: string | null
}

export interface IRelease {
	id?: number
	owner_id: ArtistID | null
	title: string
	releaseType: ReleaseType
	descript: string | null
	price: null | number
	genres: GenresArray
	coverUrl: string | null
}

export interface ISong {
	release_id: ReleaseID | null
	title: string
	featuring: number[]
	lyrics: string | null
	id?: number
	audioUrl?: string
}
