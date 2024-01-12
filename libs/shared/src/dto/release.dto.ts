import {
	ArtistId,
	GenreType,
	GenresArray,
	INewReleaseSucc,
	IReleaseSucc,
	IReleasesListSucc,
	ReleaseId,
	ReleasePrice,
	ReleaseType,
} from "../utils"
import { ReplyDTO } from "./layers/reply"

// CREATE RELEASE
export interface CreateReleaseReqDTO {
	release: {
		owner_id: ArtistId
		title: string
		releaseType: ReleaseType
		descript: string | null
		price: ReleasePrice | null
		genres: GenresArray
	}
	songs: {
		// audio: File
		title: string
		featuring: number[]
		lyrics: string | null
	}[]
}

export class CreateReleaseReplyDTO extends ReplyDTO<INewReleaseSucc> {}

// MODIFY
export interface ModifyReleaseReqDTO {
	id: ReleaseId
	newAmount: ReleasePrice
}
export class ModifyReleaseReplyDTO extends ReplyDTO<boolean> {}

// HIDE
export interface HideReleaseReqDTO {
	id: ReleaseId
	isPublic: boolean
}
export class HideReleaseReplyDTO extends ReplyDTO<boolean> {}

// GET
export class GetReleaseReplyDTO extends ReplyDTO<IReleaseSucc> {}

// GET ALL
export class GetAllReleasesReplyDTO extends ReplyDTO<IReleasesListSucc> {}

// FIND MANY BY GENRE
export type FindReleasesByGenreReqDTO = GenreType

export class FindReleasesByGenreReplyDTO extends ReplyDTO<IReleasesListSucc> {}

// FIND MANY BY ARTIST
export class FindReleasesByArtistReplyDTO extends ReplyDTO<IReleasesListSucc> {}
