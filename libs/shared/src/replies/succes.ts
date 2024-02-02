import { ArtistDTO } from "../dto"
import { ProfileID, UserAuthID, UserProfileType, UserToken } from "../types"

export type ILoginSuccess = UserToken | boolean

export interface INewArtistBackSucces {
	id: ProfileID
	authID: UserAuthID
}
export type INewArtistSucces = INewArtistBackSucces | boolean

export type IFindByAuthID = { profile: ArtistDTO; profileType: UserProfileType }
