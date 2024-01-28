import { CookieOptions } from "Shared"

export class UserCookie {
	name: string
	val: string
	options: CookieOptions

	constructor(name: string, val: string, options: CookieOptions) {
		this.name = name
		this.val = val
		this.options = options
	}
}
