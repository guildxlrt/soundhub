import { BaseReposArtistItem, BaseReposRemovableItem, InputsLayer } from "../../../assets"
import { ArtistId, Announce, AnnounceId } from "../../entities"

export abstract class AnnounceRepository
	implements BaseReposArtistItem<Announce>, BaseReposRemovableItem
{
	abstract create(inputs: InputsLayer<unknown, boolean>): Promise<InputsLayer<unknown, boolean>>

	abstract delete(
		inputs: InputsLayer<AnnounceId, unknown>
	): Promise<InputsLayer<AnnounceId, unknown>>

	abstract get(
		inputs: InputsLayer<AnnounceId, Announce>
	): Promise<InputsLayer<AnnounceId, Announce>>

	abstract getAll(
		inputs: InputsLayer<unknown, Announce[]>
	): Promise<InputsLayer<unknown, Announce[]>>

	abstract findManyByArtist(
		inputs: InputsLayer<ArtistId, Announce[]>
	): Promise<InputsLayer<ArtistId, Announce[]>>
}
