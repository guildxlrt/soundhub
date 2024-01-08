import { ArtistId, ISongSucc, ReleaseId, SongId } from "../utils"
import { ReplyDTO } from "./layers/reply"

// GET SONG
export interface GetSongReqDTO {
	id: SongId
}
export class GetSongReplyDTO extends ReplyDTO<ISongSucc> {}

// FIND MANY BY ARTIST
export interface FindSongsByArtistReqDTO {
	id: ArtistId
}
export class FindSongsByArtistReplyDTO extends ReplyDTO<ISongSucc[]> {}

// FIND MANY BY RELEASE
export interface FindSongsByReleaseReqDTO {
	id: ReleaseId
}
export class FindSongsByReleaseReplyDTO extends ReplyDTO<ISongSucc[]> {}
