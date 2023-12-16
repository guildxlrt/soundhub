import { BaseReposArtistItem, BaseReposRemovableItem, InputsLayer } from "../../../assets"
import { ArtistId, Event, EventId } from "../../entities"

export abstract class EventRepository
	implements BaseReposArtistItem<Event>, BaseReposRemovableItem
{
	abstract create(inputs: InputsLayer<unknown, boolean>): Promise<InputsLayer<unknown, boolean>>

	abstract delete(inputs: InputsLayer<EventId, unknown>): Promise<InputsLayer<EventId, unknown>>

	abstract get(inputs: InputsLayer<EventId, Event>): Promise<InputsLayer<EventId, Event>>

	abstract getAll(inputs: InputsLayer<unknown, Event[]>): Promise<InputsLayer<unknown, Event[]>>

	abstract findManyByArtist(
		inputs: InputsLayer<ArtistId, Event[]>
	): Promise<InputsLayer<ArtistId, Event[]>>
}
