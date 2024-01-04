import { ArtistId, IAnnounce } from "Shared-utils"
import { ReplyDTO } from "../assets"

// CREATE POST
export interface CreateAnnounceInputDTO {
	artist_id: ArtistId
	title: string
	text: string
}
export class CreateAnnounceReplyDTO extends ReplyDTO<boolean> {}

// DELETE POST
export interface DeleteAnnounceInputDTO {
	id: number
}
export class DeleteAnnounceReplyDTO extends ReplyDTO<void> {}

// GET POST
export interface GetAnnounceInputDTO {
	id: number
}
export class GetAnnounceReplyDTO extends ReplyDTO<IAnnounce> {}

// GET ALL
export class GetAllAnnouncesReplyDTO extends ReplyDTO<IAnnounce[]> {}

// FIND MANY BY ARTIST
export interface FindAnnouncesByArtistInputDTO {
	id: number
}
export class FindAnnouncesByArtistReplyDTO extends ReplyDTO<IAnnounce[]> {}
