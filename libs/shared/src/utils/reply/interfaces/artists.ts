import { ArtistId, EventId, UserAuthId } from "../../types"

// ARTIST
export interface INewArtistSucc {
	message: string
	userAuthId: UserAuthId
}

export type IArtistInfoSucc = null | {
	id: ArtistId | undefined
	name: string | undefined
	bio: string | null
	members: string[] | undefined
	genres: [string | undefined, string | undefined, string | undefined]
	avatarUrl: string | null
}

export type IArtistsListSucc = Omit<IArtistInfoSucc, "bio" | "members">[]
export type IArtistsListItemSucc = IArtistsListSucc[0]
