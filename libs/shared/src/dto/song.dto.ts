import { ISongSucc } from "../utils"
import { ReplyDTO } from "./layers/reply"

// GET SONG
export class GetSongReplyDTO extends ReplyDTO<ISongSucc> {}

// FIND MANY BY ARTIST
export class FindSongsByArtistReplyDTO extends ReplyDTO<ISongSucc[]> {}

// FIND MANY BY RELEASE
export class FindSongsByReleaseReplyDTO extends ReplyDTO<ISongSucc[]> {}
