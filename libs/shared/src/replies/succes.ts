import { GetArtistDTO } from "../dto"
import { ArtistProfileID, UserAuthID, UserProfileType, UserToken } from "../types"

export type ILoginSuccess = UserToken | boolean

export interface INewArtistBackSucces {
	id: ArtistProfileID
	authID: UserAuthID
}
export type INewArtistSuccess = INewArtistBackSucces | boolean

export type IfindByAuthIDSuccess = { profile: GetArtistDTO; profileType: UserProfileType }

export interface IGetFullReleaseSuccess {
	id: number
	createdAt: Date
	title: string
	publisher_id: number
	genres: string[]
	releaseType: string
	descript: string | null
	price: number | null
	folderPath: string | null
	isPublic: boolean
	songs: {
		id: number
		title: string
		audioPath: string
		lyrics: string | null
	}[]
}

export interface IGetArtistAuthsSuccess {
	id: number
	user_auth_id: number
}

export interface IArtistNameSuccess {
	id: number
	name: string
}

export interface IGetEventSuccess {
	id: number
	title: string
	organisator_id: number
	date: Date
	place: string
	artists: number[]
	text: string
	imagePath: string | null
}

export interface IGetEventShortSuccess {
	id: number
	title: string
	date: Date
	place: string
	artists: number[]
}

export interface IGetFullSongSuccess {
	readonly id: number
	readonly release_id: number
	readonly title: string
	readonly audioPath: string
}
