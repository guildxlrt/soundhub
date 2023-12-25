import { AnnounceId, ArtistId, IAnnounce } from "Shared-utils"
import { ArtistItemMethods, RemoveMethods, InputLayer } from "../../../assets"

export abstract class AnnounceRepository implements ArtistItemMethods<IAnnounce>, RemoveMethods {
	abstract create(inputs: InputLayer<unknown>): Promise<InputLayer<boolean>>

	abstract delete(inputs: InputLayer<AnnounceId>): Promise<InputLayer<unknown>>

	abstract get(inputs: InputLayer<AnnounceId>): Promise<InputLayer<IAnnounce>>

	abstract getAll(inputs: InputLayer<unknown>): Promise<InputLayer<IAnnounce[]>>

	abstract findManyByArtist(inputs: InputLayer<ArtistId>): Promise<InputLayer<IAnnounce[]>>
}
