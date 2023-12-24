import { InputDTO, INewEvent } from "../../assets"
import { ArtistId, Event, EventId } from "Domain"

// CREATE POST
export class CreateEventInputDTO extends InputDTO<INewEvent> {}
export class CreateEventReplyDTO extends InputDTO<boolean> {}

// DELETE POST
export class DeleteEventInputDTO extends InputDTO<EventId> {}
export class DeleteEventReplyDTO extends InputDTO<void> {}

// GET POST
export class GetEventInputDTO extends InputDTO<EventId> {}
export class GetEventReplyDTO extends InputDTO<Event> {}

// GET ALL
export class GetAllEventsInputDTO extends InputDTO<void> {}
export class GetAllEventsReplyDTO extends InputDTO<Event[]> {}

// FIND MANY BY ARTIST
export class FindEventsByArtistInputDTO extends InputDTO<ArtistId> {}
export class FindEventsByArtistReplyDTO extends InputDTO<Event[]> {}
