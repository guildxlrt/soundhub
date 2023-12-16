import { ArtistId, Release, ReleaseId } from "../../entities"
import { BaseReposArtistItem, BaseReposGenred, InputsLayer } from "../../../assets"
import { GenreType } from "Shared-utils"

export abstract class ReleaseRepository
	implements BaseReposArtistItem<Release>, BaseReposGenred<Release>
{
	abstract create(inputs: InputsLayer<unknown, boolean>): Promise<InputsLayer<unknown, boolean>>

	abstract modifyPrice(
		inputs: InputsLayer<unknown, boolean>
	): Promise<InputsLayer<unknown, boolean>>

	abstract get(inputs: InputsLayer<ReleaseId, Release>): Promise<InputsLayer<ReleaseId, Release>>

	abstract getAll(
		inputs: InputsLayer<unknown, Release[]>
	): Promise<InputsLayer<unknown, Release[]>>

	abstract findManyByArtist(
		inputs: InputsLayer<ArtistId, Release[]>
	): Promise<InputsLayer<ArtistId, Release[]>>

	abstract findManyByGenre(
		inputs: InputsLayer<GenreType, Release[]>
	): Promise<InputsLayer<GenreType, Release[]>>

	abstract getUserReleases(
		inputs: InputsLayer<unknown, Release[]>
	): Promise<InputsLayer<unknown, Release[]>>
}
