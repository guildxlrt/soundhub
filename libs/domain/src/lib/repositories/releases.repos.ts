import { GenreParams, IdParams, NewReleaseParams, ReleasePriceParams } from "./params"
import { ReplyLayer } from "Shared-utils"

export interface ReleasesRepository {
	create(inputs: NewReleaseParams): Promise<ReplyLayer<string>>
	modifyPrice(inputs: ReleasePriceParams): Promise<ReplyLayer<boolean>>
	get(inputs: IdParams): Promise<ReplyLayer<unknown>>
	getAll(): Promise<ReplyLayer<unknown[]>>
	findManyByArtist(inputs: IdParams): Promise<ReplyLayer<unknown[]>>
	findManyByGenre(inputs: GenreParams): Promise<ReplyLayer<unknown[]>>
}
