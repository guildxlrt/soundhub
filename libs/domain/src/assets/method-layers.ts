import { GenreType } from "Shared-utils"
import { InputLayer, OutputLayer } from "./abstracts"

export interface UserMethods<T> {
	create(inputs: InputLayer<unknown>): Promise<OutputLayer<boolean>>

	modify(inputs: InputLayer<unknown>): Promise<OutputLayer<boolean>>

	getById(inputs: InputLayer<number>): Promise<OutputLayer<T>>

	getByEmail(inputs: InputLayer<string>): Promise<OutputLayer<T>>
}

export interface ArtistItemMethods<T> {
	get(inputs: InputLayer<number>): Promise<OutputLayer<T>>

	getAll(inputs: InputLayer<unknown>): Promise<OutputLayer<T[]>>

	findManyByArtist(inputs: InputLayer<number>): Promise<OutputLayer<T[]>>
}

export interface GenreMethods<T> {
	findManyByGenre(inputs: InputLayer<GenreType>): Promise<OutputLayer<T[]>>
}

export interface RemoveMethods {
	create(inputs: InputLayer<unknown>): Promise<OutputLayer<boolean>>

	delete(inputs: InputLayer<number>): Promise<OutputLayer<unknown>>
}
