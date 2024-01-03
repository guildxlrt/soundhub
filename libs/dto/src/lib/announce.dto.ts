import { AnnounceId, ArtistId, INewAnnounce, IAnnounce } from "Shared-utils"
import { InputDTO, ReplyDTO } from "../assets"

// CREATE POST
export class CreateAnnounceInputDTO extends InputDTO<INewAnnounce> {}
export class CreateAnnounceReplyDTO extends ReplyDTO<boolean> {}

// DELETE POST
export class DeleteAnnounceInputDTO extends InputDTO<AnnounceId> {}
export class DeleteAnnounceReplyDTO extends ReplyDTO<void> {}

// GET POST
export class GetAnnounceInputDTO extends InputDTO<AnnounceId> {}
export class GetAnnounceReplyDTO extends ReplyDTO<IAnnounce> {}

// GET ALL
export class GetAllAnnouncesReplyDTO extends ReplyDTO<IAnnounce[]> {}

// FIND MANY BY ARTIST
export class FindAnnouncesByArtistInputDTO extends InputDTO<ArtistId> {}
export class FindAnnouncesByArtistReplyDTO extends ReplyDTO<IAnnounce[]> {}
