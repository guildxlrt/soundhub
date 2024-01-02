import { ArtistId, EventId, IEvent } from "Shared-utils"
import { ArtistItemMethods, RemoveMethods, InputLayer, OutputLayer } from "../../assets"

export abstract class EventRepository implements ArtistItemMethods, RemoveMethods {
	abstract create(inputs: InputLayer<unknown>): Promise<OutputLayer<boolean>>

	abstract delete(inputs: InputLayer<EventId>): Promise<OutputLayer<unknown>>

	abstract get(inputs: InputLayer<EventId>): Promise<OutputLayer<IEvent>>

	abstract getAll(): Promise<OutputLayer<IEvent[]>>

	abstract findManyByArtist(inputs: InputLayer<ArtistId>): Promise<OutputLayer<IEvent[]>>
}
