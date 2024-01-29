import { Artist } from "@prisma/client"
import { ProfileID, UserTokenData } from "../../types"

// ARTIST
export interface INewArtistSucc {
	data: Artist
	userTokenData?: UserTokenData
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
