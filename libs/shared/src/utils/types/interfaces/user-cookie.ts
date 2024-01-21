import { UserProfileType } from "../enums"

export class UserCookie {
	id: number
	profileID: number
	profileType: UserProfileType

	constructor(id: number, profileID: number, profileType: UserProfileType) {
		this.id = id
		this.profileID = profileID
		this.profileType = profileType
	}
}
