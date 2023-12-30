import { ArtistId, GenresArray } from "Shared-utils"

// ARTIST
export interface IArtist {
	id: ArtistId
	name: string
	bio: string | null
	members: string[] | null
	genres: GenresArray
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
	name: string
	bio: string
	members: string[]
	genres: GenresArray
	avatar: boolean | null // true = add, null = no changes, false = remove
}
