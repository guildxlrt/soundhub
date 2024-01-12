import { IAnnounceSucc, IAnnouncesListSucc, UrlParams } from "../utils"
import { ReplyDTO } from "./layers/reply"

// CREATE POST
export interface CreateAnnounceReqDTO {
	title: string
	text: string
}
export class CreateAnnounceReplyDTO extends ReplyDTO<boolean> {}

// MODIFY POST
export interface ModifyAnnounceReqDTO {
	title: string
	text: string
}
export class ModifyAnnounceReplyDTO extends ReplyDTO<boolean> {}

// DELETE POST
export type DeleteAnnounceReqDTO = UrlParams
export class DeleteAnnounceReplyDTO extends ReplyDTO<void> {}

// GET POST
export type GetAnnounceReqDTO = UrlParams
export class GetAnnounceReplyDTO extends ReplyDTO<IAnnounceSucc> {}

// GET ALL
export class GetAllAnnouncesReplyDTO extends ReplyDTO<IAnnouncesListSucc> {}

// FIND MANY BY ARTIST
export type FindAnnouncesByArtistReqDTO = UrlParams
export class FindAnnouncesByArtistReplyDTO extends ReplyDTO<IAnnouncesListSucc> {}
