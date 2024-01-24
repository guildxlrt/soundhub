import { UserProfileType } from "../enums"

export class UserTokenData {
	id: number
	profileID: number
	profileType: UserProfileType

	constructor(id: number, profileID: number, profileType: UserProfileType) {
		this.id = id
		this.profileID = profileID
		this.profileType = profileType
	}
}

interface CookieOptions {
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

export class Cookie {
	name: string
	val: string
	options: CookieOptions

	constructor(name: string, val: string, options: CookieOptions) {
		this.name = name
		this.val = val
		this.options = options
	}
	// gen("jwt", token, {
	// 	maxAge: expires,
	// 	httpOnly: true,
	// 	sameSite: "lax",
	// 	secure: false,}) {}
}
