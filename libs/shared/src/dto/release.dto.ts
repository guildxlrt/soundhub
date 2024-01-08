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
		artist_id: ArtistId
		title: string
		releaseType: ReleaseType
		descript: string | null
		price: ReleasePrice | null
		genres: GenresArray
		cover: boolean
	}
	songs: {
		// audio: File
		title: string
		featuring: number[]
		lyrics: string | null
	}[]
}

export class CreateReleaseReplyDTO extends ReplyDTO<INewReleaseSucc> {}

// MODIFY PRICE
export interface ModifyReleasePriceReqDTO {
	id: ReleaseId
	newAmount: ReleasePrice
}
export class ModifyReleasePriceReplyDTO extends ReplyDTO<boolean> {}

// GET ARTIST
export interface GetReleaseReqDTO {
	id: ReleaseId
}
export class GetReleaseReplyDTO extends ReplyDTO<IReleaseSucc> {}

// GET ALL
export class GetAllReleasesReplyDTO extends ReplyDTO<IReleasesListSucc> {}

// FIND MANY BY GENRE
export type FindReleasesByGenreReqDTO = GenreType

export class FindReleasesByGenreReplyDTO extends ReplyDTO<IReleasesListSucc> {}

// FIND MANY BY ARTIST
export interface FindReleasesByArtistReqDTO {
	id: ArtistId
}
export class FindReleasesByArtistReplyDTO extends ReplyDTO<IReleasesListSucc> {}
