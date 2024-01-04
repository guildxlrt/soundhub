import { ArtistId, EventId, GenresArray, ReleaseId, ReleaseType, SongId } from "Shared-utils"
import {} from "Shared-utils"

// ARTIST
export interface INewArtistSuccess {
	message: string
	userAuthId: number
}

export interface IArtistInfoLong {
	id: ArtistId | undefined
	name: string | undefined
	bio: string | null
	members: string[] | undefined
	genres: [string | undefined, string | undefined, string | undefined]
	avatarUrl: string | null
}

export type IArtistInfoShort = Omit<IArtistInfoLong, "bio" | "members">

export type IArtistsList = IArtistInfoShort[]

// SONG
export interface ISong {
	id: SongId
	release_id: ReleaseId
	audioUrl: string
	title: string
	featuring: number[] | null
	lyrics: string | null
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
	songs_list: { audioUrl: string; title: string }[]
	coverUrl: string | null
}

// EVENT
export interface IEvent {
	id: EventId
	planner: ArtistId
	date: Date
	location: string
	artists: ArtistId[]
	title: string
	text: string
	imageUrl: string | null
}

// ANNOUNCE
export interface IAnnounce {
	artist_id: ArtistId
	title: string
	text: string
	imageUrl: string | null
	videoUrl: string | null
}
