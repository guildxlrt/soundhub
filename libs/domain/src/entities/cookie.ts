import { CookieOptions, IUserCookie, UserCookieName } from "Shared"

export class UserCookie implements IUserCookie {
	name: UserCookieName
	val: string
	options: CookieOptions

	constructor(name: UserCookieName, val: string, options: CookieOptions) {
		this.name = name
		this.val = val
		this.options = options
	}
}
