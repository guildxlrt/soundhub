import {
	ArtistId,
	EventId,
	GenresArray,
	ReleaseId,
	ReleaseType,
	SongId,
	UserAuthId,
} from "Shared-utils"

// ARTIST
export interface INewArtistSucc {
	message: string
	userAuthId: UserAuthId
}

export interface IArtistInfoSucc {
	id: ArtistId | undefined
	name: string | undefined
	bio: string | null
	members: string[] | undefined
	genres: [string | undefined, string | undefined, string | undefined]
	avatarUrl: string | null
}

export type IArtistInfoShortSucc = Omit<IArtistInfoSucc, "bio" | "members">

export type IArtistsListSucc = IArtistInfoShortSucc[]

// SONG
export interface ISongSucc {
	id: SongId
	release_id: ReleaseId
	audioUrl: string
	title: string
	featuring: number[] | null
	lyrics: string | null
}

// RELEASE
export interface INewReleaseSucc {
	message: string
	id: ReleaseId
}

export interface IReleaseSucc {
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
export type IReleaseShortSucc = Omit<IReleaseSucc, "descript" | "price" | "songs_list">

export type IReleasesListSucc = IArtistInfoShortSucc[]

// EVENT
export interface IEventSucc {
	id: EventId
	planner: ArtistId
	date: Date
	place: string
	artists: ArtistId[]
	title: string
	text: string
	imageUrl: string | null
}

// ANNOUNCE
export interface IAnnounceSucc {
	artist_id: ArtistId
	title: string
	text: string
	imageUrl: string | null
	videoUrl: string | null
}
