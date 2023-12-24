import { InputDTO, INewAnnounce } from "../../assets"
import { ArtistId, Announce, AnnounceId } from "Domain"

// CREATE POST
export class CreateAnnounceInputDTO extends InputDTO<INewAnnounce> {}
export class CreateAnnounceReplyDTO extends InputDTO<boolean> {}

// DELETE POST
export class DeleteAnnouncesInputDTO extends InputDTO<AnnounceId> {}
export class DeleteAnnouncesReplyDTO extends InputDTO<void> {}

// GET POST
export class GetAnnounceInputDTO extends InputDTO<AnnounceId> {}
export class GetAnnounceReplyDTO extends InputDTO<Announce> {}

// GET ALL
export class GetAllAnnouncesInputDTO extends InputDTO<void> {}
export class GetAllAnnouncesReplyDTO extends InputDTO<Announce[]> {}

// FIND MANY BY ARTIST
export class FindAnnouncesByArtistInputDTO extends InputDTO<ArtistId> {}
export class FindAnnouncesByArtistReplyDTO extends InputDTO<Announce[]> {}
