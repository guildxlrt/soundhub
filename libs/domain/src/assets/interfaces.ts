import { GenreType } from "Shared-utils"

export interface InputLayer<D> {
	readonly data: D
}

export interface OutputLayer<D> {
	readonly data: D
	error?: {
		status: number
		message: string
	}
}

export interface BaseReposUser<T> {
	create(inputs: InputLayer<unknown>): Promise<OutputLayer<boolean>>

	modify(inputs: InputLayer<unknown>): Promise<OutputLayer<boolean>>

	getById(inputs: InputLayer<number>): Promise<OutputLayer<T>>

	getByEmail(inputs: InputLayer<string>): Promise<OutputLayer<T>>
}

export interface BaseReposArtistItem<T> {
	get(inputs: InputLayer<number>): Promise<OutputLayer<T>>

	getAll(inputs: InputLayer<unknown>): Promise<OutputLayer<T[]>>

	findManyByArtist(inputs: InputLayer<number>): Promise<OutputLayer<T[]>>
}

export interface BaseReposGenred<T> {
	getAll(inputs: InputLayer<unknown>): Promise<OutputLayer<T[]>>

	findManyByGenre(inputs: InputLayer<GenreType>): Promise<OutputLayer<T[]>>
}

export interface BaseReposRemovableItem {
	create(inputs: InputLayer<unknown>): Promise<OutputLayer<boolean>>

	delete(inputs: InputLayer<number>): Promise<OutputLayer<unknown>>
}
