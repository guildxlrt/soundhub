import { UserProfileType } from "./user-profile"

export class UserCookie {
	id: number
	profileId: number
	profileType: UserProfileType

	constructor(id: number, profileId: number, profileType: UserProfileType) {
		this.id = id
		this.profileId = profileId
		this.profileType = profileType
	}
}
