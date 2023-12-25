import { ArtistId, GenreType, IArtist, UserAuthEmail } from "Shared-utils"
import { UserMethods, GenreMethods, InputLayer, OutputLayer } from "../../../assets"

export abstract class ArtistRepository implements UserMethods<IArtist>, GenreMethods<IArtist> {
	abstract create(inputs: InputLayer<unknown>): Promise<OutputLayer<boolean>>

	abstract modify(inputs: InputLayer<unknown>): Promise<OutputLayer<boolean>>

	abstract getById(inputs: InputLayer<ArtistId>): Promise<OutputLayer<IArtist>>

	abstract getByEmail(inputs: InputLayer<UserAuthEmail>): Promise<OutputLayer<IArtist>>

	abstract getAll(inputs: InputLayer<unknown>): Promise<OutputLayer<IArtist[]>>

	abstract findManyByGenre(inputs: InputLayer<GenreType>): Promise<OutputLayer<IArtist[]>>
}
