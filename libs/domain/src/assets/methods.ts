export interface UserMethods {
	create(inputs: unknown): unknown
	modify(inputs: unknown): unknown
	getById(inputs: unknown): unknown
	getByEmail(inputs: unknown): unknown
}

export interface ArtistItemMethods {
	get(inputs: unknown): unknown
	getAll(inputs: unknown): unknown
	findManyByArtist(inputs: unknown): unknown
}

export interface GenreMethods {
	findManyByGenre(inputs: unknown): unknown
}

export interface RemoveMethods {
	delete(inputs: unknown): unknown
}
