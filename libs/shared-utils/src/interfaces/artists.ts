import { ArtistId } from "Shared-utils"

// ARTIST
export interface IArtistInfoLong {
	id: ArtistId | undefined
	name: string | undefined
	bio: string | null
	members: string[] | undefined
	genres: [string | undefined, string | undefined, string | undefined]
	avatarUrl: string | null
}

export type IArtistInfoShort = Omit<IArtistInfoLong, "bio" | "members">

export type IArtistsList = IArtistInfoShort[]
