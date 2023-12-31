import { ArtistId, ISongSucc, ReleaseId, SongId } from "Shared-utils"
import { ReplyDTO } from "../assets"

// GET SONG
export interface GetSongInputDTO {
	id: SongId
}
export class GetSongReplyDTO extends ReplyDTO<ISongSucc> {}

// FIND MANY BY ARTIST
export interface FindSongsByArtistInputDTO {
	id: ArtistId
}
export class FindSongsByArtistReplyDTO extends ReplyDTO<ISongSucc[]> {}

// FIND MANY BY RELEASE
export interface FindSongsByReleaseInputDTO {
	id: ReleaseId
}
export class FindSongsByReleaseReplyDTO extends ReplyDTO<ISongSucc[]> {}
