import { ArtistId, ISong, ReleaseId, SongId } from "Shared-utils"
import { ReplyDTO } from "../assets"

// GET SONG
export interface GetSongInputDTO {
	id: SongId
}
export class GetSongReplyDTO extends ReplyDTO<ISong> {}

// FIND MANY BY ARTIST
export interface FindSongsByArtistInputDTO {
	id: ArtistId
}
export class FindSongsByArtistReplyDTO extends ReplyDTO<ISong[]> {}

// FIND MANY BY RELEASE
export interface FindSongsByReleaseInputDTO {
	id: ReleaseId
}
export class FindSongsByReleaseReplyDTO extends ReplyDTO<ISong[]> {}
