import { GenreType } from "Shared-utils"
import { Artist, ArtistId, UserAuthEmail } from "../../entities"
import { BaseReposUser, BaseReposGenred, InputsLayer } from "../../../assets"

export abstract class ArtistRepository implements BaseReposUser<Artist>, BaseReposGenred<Artist> {
	abstract create(inputs: InputsLayer<unknown, boolean>): Promise<InputsLayer<unknown, boolean>>

	abstract modify(inputs: InputsLayer<unknown, boolean>): Promise<InputsLayer<unknown, boolean>>

	abstract getById(inputs: InputsLayer<ArtistId, Artist>): Promise<InputsLayer<ArtistId, Artist>>

	abstract getByEmail(
		inputs: InputsLayer<UserAuthEmail, Artist>
	): Promise<InputsLayer<UserAuthEmail, Artist>>

	abstract getAll(inputs: InputsLayer<unknown, Artist[]>): Promise<InputsLayer<unknown, Artist[]>>

	abstract findManyByGenre(
		inputs: InputsLayer<GenreType, Artist[]>
	): Promise<InputsLayer<GenreType, Artist[]>>
}
