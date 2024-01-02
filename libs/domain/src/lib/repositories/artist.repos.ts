import { ArtistId, GenreType, UserAuthEmail } from "Shared-utils"
import { UserMethods, GenreMethods, InputLayer, OutputLayer } from "../../assets"

export abstract class ArtistRepository implements UserMethods, GenreMethods {
	abstract create(inputs: InputLayer<unknown>): Promise<OutputLayer<string>>

	abstract modify(inputs: InputLayer<unknown>): Promise<OutputLayer<boolean>>

	abstract getById(inputs: InputLayer<ArtistId>): Promise<OutputLayer<unknown>>

	abstract getByEmail(inputs: InputLayer<UserAuthEmail>): Promise<OutputLayer<unknown>>

	abstract getAll(): Promise<OutputLayer<unknown[]>>

	abstract findManyByGenre(inputs: InputLayer<GenreType>): Promise<OutputLayer<unknown[]>>
}
