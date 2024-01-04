import { UserMethods, GenreMethods } from "../../assets"
import { EmailParams, IdParams, GenreParams, ModifyArtistParams, NewArtistParams } from "./params"
import { Reply } from "Shared-utils"

export abstract class ArtistsRepository implements UserMethods, GenreMethods {
	abstract create(inputs: NewArtistParams): Promise<Reply<unknown>>

	abstract modify(inputs: ModifyArtistParams): Promise<Reply<boolean>>

	abstract getById(inputs: IdParams): Promise<Reply<unknown>>

	abstract getByEmail(inputs: EmailParams): Promise<Reply<unknown>>

	abstract getAll(): Promise<Reply<unknown[]>>

	abstract findManyByGenre(inputs: GenreParams): Promise<Reply<unknown[]>>
}
