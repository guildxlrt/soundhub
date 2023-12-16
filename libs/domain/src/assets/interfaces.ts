import { GenreType } from "Shared-utils"

export interface InputsLayer<D, S> {
	readonly data: D
	storage?: S
	error?: {
		status: number
		message: string
	}
}

export interface BaseReposUser<T> {
	create(inputs: InputsLayer<unknown, boolean>): Promise<InputsLayer<unknown, boolean>>

	modify(inputs: InputsLayer<unknown, boolean>): Promise<InputsLayer<unknown, boolean>>

	getById(inputs: InputsLayer<number, T>): Promise<InputsLayer<number, T>>

	getByEmail(inputs: InputsLayer<string, T>): Promise<InputsLayer<string, T>>
}

export interface BaseReposArtistItem<T> {
	get(inputs: InputsLayer<number, T>): Promise<InputsLayer<number, T>>

	getAll(inputs: InputsLayer<unknown, T[]>): Promise<InputsLayer<unknown, T[]>>

	findManyByArtist(inputs: InputsLayer<number, T[]>): Promise<InputsLayer<number, T[]>>
}

export interface BaseReposGenred<T> {
	getAll(inputs: InputsLayer<unknown, T[]>): Promise<InputsLayer<unknown, T[]>>

	findManyByGenre(inputs: InputsLayer<GenreType, T[]>): Promise<InputsLayer<GenreType, T[]>>
}

export interface BaseReposRemovableItem {
	create(inputs: InputsLayer<unknown, boolean>): Promise<InputsLayer<unknown, boolean>>

	delete(inputs: InputsLayer<number, unknown>): Promise<InputsLayer<number, unknown>>
}
