import { UserToken } from "Shared"
import { authExpires, cookieName } from "./configs"
import { CookieOptions } from "express"

export class Cookie {
	name: string = cookieName
	val: UserToken | string
	options: CookieOptions = {
		maxAge: authExpires.oneYear,
		httpOnly: true,
		sameSite: "lax",
		secure: false,
	}

	constructor(token: UserToken | string) {
		this.val = token
	}
}
