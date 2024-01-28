import { CookieOptions } from "../../types"

export interface ILoginSucc {
	data: unknown
	userCookie: { name: string; val: string; options: CookieOptions }
}
