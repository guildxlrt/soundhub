import { GenresArray, ReleaseType } from "../types"

export interface IArtist {
	id: number | undefined
	user_auth_id: number | undefined
	name: string
	bio: string
	members: string[]
	genres: GenresArray
	avatarUrl?: string
	createdAt?: Date
}

export interface IUserAuth {
	id: number | undefined
	email: string
	password: string
	createdAt?: Date
}

export interface IEvent {
	id: number | undefined
	owner_id: number | undefined
	date: Date
	place: string
	artists: number[]
	title: string
	text: string
	imageUrl?: string
	createdAt?: Date
}

export interface IAnnounce {
	id: number | undefined
	owner_id: number | undefined
	title: string
	text: string
	imageUrl?: string
	videoUrl?: string
	createdAt?: Date
}

export interface IRelease {
	id: number | undefined
	owner_id: number
	title: string
	releaseType: ReleaseType
	descript: string | null
	price: null | number
	genres: GenresArray
	coverUrl: string | null
	createdAt?: Date
}

export interface ISong {
	id: number | undefined
	release_id: number | undefined
	audioUrl: string
	title: string
	featuring: number[]
	lyrics: string | null
	createdAt?: Date
}
