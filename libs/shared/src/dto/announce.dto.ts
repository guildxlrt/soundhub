import { AnnounceId, ArtistId, IAnnounceSucc, IAnnouncesListSucc } from "../utils"
import { ReplyDTO } from "./layers/reply"

// CREATE POST
export interface CreateAnnounceInputDTO {
	artist_id: ArtistId
	title: string
	text: string
}
export class CreateAnnounceReplyDTO extends ReplyDTO<boolean> {}

// MODIFY POST
export interface ModifyAnnounceInputDTO {
	title: string
	text: string
}
export class ModifyAnnounceReplyDTO extends ReplyDTO<boolean> {}

// DELETE POST
export interface DeleteAnnounceInputDTO {
	id: AnnounceId
}
export class DeleteAnnounceReplyDTO extends ReplyDTO<void> {}

// GET POST
export interface GetAnnounceInputDTO {
	id: AnnounceId
}
export class GetAnnounceReplyDTO extends ReplyDTO<IAnnounceSucc> {}

// GET ALL
export class GetAllAnnouncesReplyDTO extends ReplyDTO<IAnnouncesListSucc> {}

// FIND MANY BY ARTIST
export interface FindAnnouncesByArtistInputDTO {
	id: ArtistId
}
export class FindAnnouncesByArtistReplyDTO extends ReplyDTO<IAnnouncesListSucc> {}
