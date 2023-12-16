import { BasicDTO, INewEvent } from "../../assets"
import { ArtistId, Event, EventId } from "Domain"

// CREATE POST
export class CreateEventDTO extends BasicDTO<INewEvent, boolean> {}

// DELETE POST
export class DeleteEventsDTO extends BasicDTO<EventId, void> {}

// GET POST
export class GetEventDTO extends BasicDTO<EventId, Event> {}

// GET ALL
export class GetAllEventsDTO extends BasicDTO<void, Event[]> {}

// FIND MANY BY ARTIST
export class FindEventsByArtistDTO extends BasicDTO<ArtistId, Event[]> {}
