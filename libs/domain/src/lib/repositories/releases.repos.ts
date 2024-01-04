import { GenreType, ArtistId, ReleaseId } from "Shared-utils"
import { ArtistItemMethods, GenreMethods, InputLayer, OutputLayer } from "../../assets"

export abstract class ReleaseRepository implements ArtistItemMethods, GenreMethods {
	abstract create(inputs: InputLayer<unknown>): Promise<OutputLayer<string>>

	abstract modifyPrice(inputs: InputLayer<unknown>): Promise<OutputLayer<boolean>>

	abstract get(inputs: InputLayer<ReleaseId>): Promise<OutputLayer<unknown>>

	abstract getAll(): Promise<OutputLayer<unknown[]>>

	abstract findManyByArtist(inputs: InputLayer<ArtistId>): Promise<OutputLayer<unknown[]>>

	abstract findManyByGenre(inputs: InputLayer<GenreType>): Promise<OutputLayer<unknown[]>>
}
