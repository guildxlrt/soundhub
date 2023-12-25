import { GenreType, ArtistId, IRelease, ReleaseId } from "Shared-utils"
import { ArtistItemMethods, GenreMethods, InputLayer } from "../../../assets"

export abstract class ReleaseRepository
	implements ArtistItemMethods<IRelease>, GenreMethods<IRelease>
{
	abstract create(inputs: InputLayer<unknown>): Promise<InputLayer<boolean>>

	abstract modifyPrice(inputs: InputLayer<unknown>): Promise<InputLayer<boolean>>

	abstract get(inputs: InputLayer<ReleaseId>): Promise<InputLayer<IRelease>>

	abstract getAll(inputs: InputLayer<unknown>): Promise<InputLayer<IRelease[]>>

	abstract findManyByArtist(inputs: InputLayer<ArtistId>): Promise<InputLayer<IRelease[]>>

	abstract findManyByGenre(inputs: InputLayer<GenreType>): Promise<InputLayer<IRelease[]>>
}
