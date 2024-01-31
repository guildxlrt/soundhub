import { UserProfileType } from "../enums"

export class UserTokenData {
	id: number
	profileID: number
	profileType?: UserProfileType

	constructor(id: number, profileID: number, profileType?: UserProfileType) {
		this.id = id
		this.profileID = profileID
		this.profileType = profileType
	}
}

export interface CookieOptions {
	maxAge?: number | undefined
	signed?: boolean | undefined
	expires?: Date | undefined
	httpOnly?: boolean | undefined
	path?: string | undefined
	domain?: string | undefined
	secure?: boolean | undefined
	encode?: ((val: string) => string) | undefined
	sameSite?: boolean | "lax" | "strict" | "none" | undefined
}

export type UserCookieName = "jwt"

export interface IUserCookie {
	name: UserCookieName
	val: string
	options: CookieOptions
}
