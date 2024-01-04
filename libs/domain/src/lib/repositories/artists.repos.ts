import { UserMethods, GenreMethods, OutputLayer } from "../../assets"
import {
	FetchByEmailParams,
	FetchByIdParams,
	FetchByGenreParams,
	ModifyArtistParams,
	NewArtistParams,
} from "../params"

export abstract class ArtistRepository implements UserMethods, GenreMethods {
	abstract create(inputs: NewArtistParams): Promise<OutputLayer<unknown>>

	abstract modify(inputs: ModifyArtistParams): Promise<OutputLayer<boolean>>

	abstract getById(inputs: FetchByIdParams): Promise<OutputLayer<unknown>>

	abstract getByEmail(inputs: FetchByEmailParams): Promise<OutputLayer<unknown>>

	abstract getAll(): Promise<OutputLayer<unknown[]>>

	abstract findManyByGenre(inputs: FetchByGenreParams): Promise<OutputLayer<unknown[]>>
}
