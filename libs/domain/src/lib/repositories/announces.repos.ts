import { AnnounceId, ArtistId, IAnnounce } from "Shared-utils"
import { ArtistItemMethods, RemoveMethods, InputLayer, OutputLayer } from "../../assets"

export abstract class AnnounceRepository implements ArtistItemMethods, RemoveMethods {
	abstract create(inputs: InputLayer<unknown>): Promise<OutputLayer<boolean>>

	abstract delete(inputs: InputLayer<AnnounceId>): Promise<OutputLayer<unknown>>

	abstract get(inputs: InputLayer<AnnounceId>): Promise<OutputLayer<IAnnounce>>

	abstract getAll(): Promise<OutputLayer<IAnnounce[]>>

	abstract findManyByArtist(inputs: InputLayer<ArtistId>): Promise<OutputLayer<IAnnounce[]>>
}
