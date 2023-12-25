import { ArtistId, GenreType, GenresArray } from "Shared-utils"

// ARTIST
export interface INewArtist {
	email: string
	password: string
	confirmEmail: string
	confirmPass: string
	name: string
	bio: string
	members: string[]
	genres: GenresArray
	avatar?: File
}

export interface IModifyArtist {
	name: string
	bio: string
	members: string[]
	genres: GenresArray
	avatar?: File | null
}

export interface IArtist {
	id: ArtistId
	name: string
	bio: string
	avatarUrl: string | null
	members: string[] | null
	genre1: GenreType
	genre2?: GenreType
	genre3?: GenreType
}
