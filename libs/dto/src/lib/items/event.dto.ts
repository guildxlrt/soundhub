import { ArtistId, EventId, INewEvent, IEvent } from "Shared-utils"
import { InputDTO, ReplyDTO } from "../../assets"

// CREATE POST
export class CreateEventInputDTO extends InputDTO<INewEvent> {}
export class CreateEventReplyDTO extends ReplyDTO<boolean> {}

// DELETE POST
export class DeleteEventInputDTO extends InputDTO<EventId> {}
export class DeleteEventReplyDTO extends ReplyDTO<void> {}

// GET POST
export class GetEventInputDTO extends InputDTO<EventId> {}
export class GetEventReplyDTO extends ReplyDTO<IEvent> {}

// GET ALL
export class GetAllEventsInputDTO extends InputDTO<void> {}
export class GetAllEventsReplyDTO extends ReplyDTO<IEvent[]> {}

// FIND MANY BY ARTIST
export class FindEventsByArtistInputDTO extends InputDTO<ArtistId> {}
export class FindEventsByArtistReplyDTO extends ReplyDTO<IEvent[]> {}
