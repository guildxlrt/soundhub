import { GenreType, ArtistId, IRelease, ReleaseId } from "Shared-utils"
import { ArtistItemMethods, GenreMethods, InputLayer, OutputLayer } from "../../../assets"

export abstract class ReleaseRepository implements ArtistItemMethods, GenreMethods {
	abstract create(inputs: InputLayer<unknown>): Promise<OutputLayer<boolean>>

	abstract modifyPrice(inputs: InputLayer<unknown>): Promise<OutputLayer<boolean>>

	abstract get(inputs: InputLayer<ReleaseId>): Promise<OutputLayer<IRelease>>

	abstract getAll(inputs: InputLayer<unknown>): Promise<OutputLayer<IRelease[]>>

	abstract findManyByArtist(inputs: InputLayer<ArtistId>): Promise<OutputLayer<IRelease[]>>

	abstract findManyByGenre(inputs: InputLayer<GenreType>): Promise<OutputLayer<IRelease[]>>
}
