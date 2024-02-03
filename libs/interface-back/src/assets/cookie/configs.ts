export const cookieName = "jwt"

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

export const authExpires = {
	// set time in miliseconds
	oneYear: 31557600000,
	oneWeek: 604800000,
	oneDay: 86400000,
	none: undefined, // no expiration
} as const
