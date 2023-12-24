import { GenreType } from "Shared-utils"
import { Artist, ArtistId, UserAuthEmail } from "../../entities"
import { BaseReposUser, BaseReposGenred, InputLayer, OutputLayer } from "../../../assets"

export abstract class ArtistRepository implements BaseReposUser<Artist>, BaseReposGenred<Artist> {
	abstract create(inputs: InputLayer<unknown>): Promise<OutputLayer<boolean>>

	abstract modify(inputs: InputLayer<unknown>): Promise<OutputLayer<boolean>>

	abstract getById(inputs: InputLayer<ArtistId>): Promise<OutputLayer<Artist>>

	abstract getByEmail(inputs: InputLayer<UserAuthEmail>): Promise<OutputLayer<Artist>>

	abstract getAll(inputs: InputLayer<unknown>): Promise<OutputLayer<Artist[]>>

	abstract findManyByGenre(inputs: InputLayer<GenreType>): Promise<OutputLayer<Artist[]>>
}
