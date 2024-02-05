import { EmailParams, IdParams, GenreParams, ModifyArtistParams, NewArtistParams } from "./params"
import { ReplyLayer } from "Shared-utils"

export interface ArtistsRepository {
	create(inputs: NewArtistParams): Promise<ReplyLayer<unknown>>
	modify(inputs: ModifyArtistParams): Promise<ReplyLayer<boolean>>
	getById(inputs: IdParams): Promise<ReplyLayer<unknown>>
	getByEmail(inputs: EmailParams): Promise<ReplyLayer<unknown>>
	getAll(): Promise<ReplyLayer<unknown[]>>
	findManyByGenre(inputs: GenreParams): Promise<ReplyLayer<unknown[]>>
}
