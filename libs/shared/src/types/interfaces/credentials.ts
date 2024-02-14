import { UserRoleType } from "../enums"

export class UserToken {
	authID: number
	profileID: number
	profileType: UserRoleType

	constructor(authID: number, profileID: number, profileType: UserRoleType) {
		this.authID = authID
		this.profileID = profileID
		this.profileType = profileType
	}
}
