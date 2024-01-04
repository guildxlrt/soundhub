import { GenreType } from "Shared-utils"

export interface FetchByIdParams {
	id: number
}

export interface FetchByEmailParams {
	email: string
}

export interface FetchByGenreParams {
	genre: GenreType
}
