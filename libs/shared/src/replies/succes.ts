import { GetArtistDTO } from "../dto"
import { ArtistProfileID, UserAuthID, UserProfileType, UserToken } from "../types"

export type ILoginSuccess = UserToken | boolean

export interface INewArtistBackSucces {
	id: ArtistProfileID
	authID: UserAuthID
}
export type INewArtistSuccess = INewArtistBackSucces | boolean

export type IfindManyByAuthIDSuccess = { profile: GetArtistDTO; profileType: UserProfileType }

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

export interface IGetArtistNameSuccess {
	id: number
	name: string
}

export interface IGetEventSuccess {
	id: number
	title: string
	organisator_id: number
	date: Date
	place: string

	text: string
	imagePath: string | null
}

export interface IGetEventShortSuccess {
	id: number
	title: string
	date: Date
	place: string
}
export type IFindManyByArtistGenreSuccess = FlatArray<
	{
		id: number
		date: Date
		place: string

		title: string
	}[],
	| 0
	| 1
	| 2
	| -1
	| 3
	| 4
	| 5
	| 6
	| 7
	| 8
	| 9
	| 10
	| 11
	| 12
	| 13
	| 14
	| 15
	| 16
	| 17
	| 18
	| 19
	| 20
>[]
