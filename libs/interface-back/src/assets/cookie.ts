import { authExpires } from "Infra-backend"
import { UserToken } from "Shared"

export const cookieName = "jwt"

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
