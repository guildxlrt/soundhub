import { ArtistId, GenresArray } from "Shared-utils"

// ARTIST
export interface IArtist {
	id: ArtistId | undefined
	name: string | undefined
	bio: string | null
	members: string[] | undefined
	genres: [string | undefined, string | undefined, string | undefined]
	avatarUrl: string | null
}

export interface INewArtist {
	auths: {
		email: string
		confirmEmail: string
		password: string
		confirmPass: string
		cleanPass: undefined | string
	}
	name: string
	bio: string
	members: string[]
	genres: GenresArray
	cleanGenres: GenresArray | undefined
	avatar: boolean
}

export interface IModifyArtist {
	id: ArtistId
	name: string
	bio: string
	members: string[]
	genres: GenresArray
	avatar: boolean | null // true = add, null = no changes, false = remove
}

export type IArtistsListItem = Omit<IArtist, "bio" | "members">

export type IArtistsList = IArtistsListItem[]
