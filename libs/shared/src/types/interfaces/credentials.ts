import { UserProfileType } from "../enums"

export class UserToken {
	authID: number
	profileID: number
	profileType: UserProfileType

	constructor(authID: number, profileID: number, profileType: UserProfileType) {
		this.authID = authID
		this.profileID = profileID
		this.profileType = profileType
	}
}
