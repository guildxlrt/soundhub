import { UserProfileType } from "../enums"

export class UserToken {
	id: number
	ArtistProfileID: number
	profileType?: UserProfileType

	constructor(id: number, ArtistProfileID: number, profileType?: UserProfileType) {
		this.id = id
		this.ArtistProfileID = ArtistProfileID
		this.profileType = profileType
	}
}
