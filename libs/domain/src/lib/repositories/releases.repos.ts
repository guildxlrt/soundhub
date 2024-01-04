import { ArtistItemMethods, GenreMethods } from "../../assets"
import { GenreParams, IdParams, NewReleaseParams, ReleasePriceParams } from "./params"
import { Reply } from "Shared-utils"

export abstract class ReleasesRepository implements ArtistItemMethods, GenreMethods {
	abstract create(inputs: NewReleaseParams): Promise<Reply<string>>

	abstract modifyPrice(inputs: ReleasePriceParams): Promise<Reply<boolean>>

	abstract get(inputs: IdParams): Promise<Reply<unknown>>

	abstract getAll(): Promise<Reply<unknown[]>>

	abstract findManyByArtist(inputs: IdParams): Promise<Reply<unknown[]>>

	abstract findManyByGenre(inputs: GenreParams): Promise<Reply<unknown[]>>
}
