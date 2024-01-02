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
	email: string
	password: string
	confirmEmail: string
	confirmPass: string
	name: string
	bio: string
	members: string[]
	genres: GenresArray
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
