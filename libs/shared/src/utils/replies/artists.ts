import { ArtistID, UserTokenData } from "../typing"

// ARTIST
export interface INewArtistSucc {
	message: string
	userCookie: UserTokenData
}

export type IArtistInfoSucc = null | {
	id: ArtistID | undefined
	name: string | undefined
	bio: string | null
	members: string[] | undefined
	genres: [string | undefined, string | undefined, string | undefined]
	avatarPath: string | null
}

export type IArtistsListSucc = Omit<IArtistInfoSucc, "bio" | "members">[]
export type IArtistsListItemSucc = IArtistsListSucc[0]
