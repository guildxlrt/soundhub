import { IEvent } from "Shared-utils"
import { ArtistItemMethods, RemoveMethods } from "../../assets"
import { IdParams, NewEventParams } from "./params"
import { Reply } from "Shared-utils"

export abstract class EventsRepository implements ArtistItemMethods, RemoveMethods {
	abstract create(inputs: NewEventParams): Promise<Reply<boolean>>

	abstract delete(inputs: IdParams): Promise<Reply<unknown>>

	abstract get(inputs: IdParams): Promise<Reply<IEvent>>

	abstract getAll(): Promise<Reply<IEvent[]>>

	abstract findManyByArtist(inputs: IdParams): Promise<Reply<IEvent[]>>
}
