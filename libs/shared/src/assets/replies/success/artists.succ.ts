import { ProfileID, CookieOptions } from "../../types"

// ARTIST
export class INewArtistSucc extends UserCookie {
	constructor(name: string, val: string, options: CookieOptions) {
		super(name, val, options)
	}
}

export type IArtistInfoSucc = null | {
	id: ProfileID | undefined
	name: string | undefined
	bio: string | null
	members: string[] | undefined
	genres: [string | undefined, string | undefined, string | undefined]
	avatarPath: string | null
}

export type IArtistsListSucc = Omit<IArtistInfoSucc, "bio" | "members">[]
export type IArtistsListItemSucc = IArtistsListSucc[0]
