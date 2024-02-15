import { GetArtistDTO } from "../dto"
import { ArtistProfileID, UserAuthID, UserRoleType, UserToken, ItemStatusType } from "../types"

export type ILoginSuccess = UserToken | boolean

export interface INewArtistBackSucces {
	id: ArtistProfileID
	authID: UserAuthID
}
export type INewArtistSuccess = INewArtistBackSucces | boolean

export type IfindByAuthIDSuccess = { profile: GetArtistDTO; profileType: UserRoleType }

export interface IGetFullRecordSuccess {
	id: number
	createdAt: Date
	title: string
	createdBy: number
	genres: string[]
	recordType: string
	descript: string | null
	price: number | null
	folderPath: string | null
	status: string
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
	createdBy: number
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
	readonly record_id: number
	readonly title: string
	readonly audioPath: string
}

export interface IFullLabel {
	id: number
	status: string
	name: string
	creationDate: Date
	bio: string | null
	website: string | null
	country: string | null
	logoPath: string | null
}

export interface ILabelName {
	id: number
	name: string
}
