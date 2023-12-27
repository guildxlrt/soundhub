import { ArtistId, ISong, ReleaseId, SongId } from "Shared-utils"
import { InputDTO, ReplyDTO } from "../assets"

// GET SONG
export class GetSongInputDTO extends InputDTO<SongId> {}
export class GetSongReplyDTO extends ReplyDTO<ISong> {}

// FIND MANY BY ARTIST
export class FindSongsByArtistInputDTO extends InputDTO<ArtistId> {}
export class FindSongsByArtistReplyDTO extends ReplyDTO<ISong[]> {}

// FIND MANY BY RELEASE
export class FindSongsByReleaseInputDTO extends InputDTO<ReleaseId> {}
export class FindSongsByReleaseReplyDTO extends ReplyDTO<ISong[]> {}
