import { ArtistId, EventId, IEvent } from "Shared-utils"
import { ArtistItemMethods, RemoveMethods, InputLayer } from "../../../assets"

export abstract class EventRepository implements ArtistItemMethods<IEvent>, RemoveMethods {
	abstract create(inputs: InputLayer<unknown>): Promise<InputLayer<boolean>>

	abstract delete(inputs: InputLayer<EventId>): Promise<InputLayer<unknown>>

	abstract get(inputs: InputLayer<EventId>): Promise<InputLayer<IEvent>>

	abstract getAll(inputs: InputLayer<unknown>): Promise<InputLayer<IEvent[]>>

	abstract findManyByArtist(inputs: InputLayer<ArtistId>): Promise<InputLayer<IEvent[]>>
}
