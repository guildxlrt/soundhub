import { CookieOptions, IUserCookie } from "Shared"

export class UserCookie implements IUserCookie {
	name: string
	val: string
	options: CookieOptions

	constructor(name: string, val: string, options: CookieOptions) {
		this.name = name
		this.val = val
		this.options = options
	}
}
