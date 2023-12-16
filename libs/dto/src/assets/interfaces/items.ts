import { GenresArray, IMedia, ReleaseType } from "Shared-utils"
import { NewSong } from "../../lib"
import { Release, Song } from "Domain"

// ANNOUNCE
export interface INewAnnounce {
	artist_id: number
	title: string
	text: string
	media?: IMedia
}

// EVENT
export interface INewEvent {
	artist_id: number
	title: string
	text: string
	media?: IMedia
}

// RELEASE
export interface INewRelease {
	artist_id: number
	title: string
	releaseType: ReleaseType
	descript: string | null
	price: number | null
	genres: GenresArray
	songs: NewSong[]
	cover?: File
}

// PRICE
export interface INewPrice {
	id: Pick<Release, "id">["id"]
	newAmount: number
}

// SONG
export type INewSong = Omit<Song, "id" | "createdAt" | "updatedAt" | "audioUrl" | "duration">
