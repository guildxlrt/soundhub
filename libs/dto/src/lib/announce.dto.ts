import { AnnounceId, ArtistId, IAnnounce } from "Shared-utils"
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
	id: AnnounceId
}
export class DeleteAnnounceReplyDTO extends ReplyDTO<void> {}

// GET POST
export interface GetAnnounceInputDTO {
	id: AnnounceId
}
export class GetAnnounceReplyDTO extends ReplyDTO<IAnnounce> {}

// GET ALL
export class GetAllAnnouncesReplyDTO extends ReplyDTO<IAnnounce[]> {}

// FIND MANY BY ARTIST
export interface FindAnnouncesByArtistInputDTO {
	id: ArtistId
}
export class FindAnnouncesByArtistReplyDTO extends ReplyDTO<IAnnounce[]> {}
