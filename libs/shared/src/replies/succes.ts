import { IUserCookie, ProfileID, UserAuthID } from "../types"

export interface ILoginBackSuccess {
	response: boolean
	userCookie: IUserCookie
}
export type ILoginSuccess = ILoginBackSuccess | boolean

export interface INewArtistBackSucces {
	id: ProfileID
	authID: UserAuthID
}
export type INewArtistSucces = INewArtistBackSucces | boolean
