import { ArtistID, IAnnounceSucc, IAnnouncesListSucc, UrlParams } from "../utils"
import { ReplyDTO } from "./layers/reply"

// CREATE POST
export class CreateAnnounceReqDTO {
	readonly title: string
	readonly text: string

	constructor(title: string, text: string) {
		this.title = title
		this.text = text
	}
}
export class CreateAnnounceReplyDTO extends ReplyDTO<boolean> {}

// MODIFY POST
export class EditAnnounceReqDTO {
	readonly id: number
	readonly owner_id: ArtistID
	readonly title: string
	readonly text: string
	readonly imagePath: string | null

	constructor(
		id: number,
		owner_id: ArtistID,
		title: string,
		text: string,
		imagePath: string | null
	) {
		this.id = id
		this.owner_id = owner_id
		this.title = title
		this.text = text
		this.imagePath = imagePath
	}
}
export class EditAnnounceReplyDTO extends ReplyDTO<boolean> {}

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
