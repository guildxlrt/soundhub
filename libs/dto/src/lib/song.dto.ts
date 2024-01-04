import { ISong } from "Shared-utils"
import { ReplyDTO } from "../assets"

// GET SONG
export interface GetSongInputDTO {
	id: number
}
export class GetSongReplyDTO extends ReplyDTO<ISong> {}

// FIND MANY BY ARTIST
export interface FindSongsByArtistInputDTO {
	id: number
}
export class FindSongsByArtistReplyDTO extends ReplyDTO<ISong[]> {}

// FIND MANY BY RELEASE
export interface FindSongsByReleaseInputDTO {
	id: number
}
export class FindSongsByReleaseReplyDTO extends ReplyDTO<ISong[]> {}
