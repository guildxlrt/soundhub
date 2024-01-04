import { ArtistId, GenreType, IRelease, ReleaseId, ReleaseType } from "Shared-utils"
import { ReplyDTO } from "../assets"

// CREATE RELEASE
export interface CreateReleaseInputDTO {
	artist_id: ArtistId
	title: string
	releaseType: ReleaseType
	descript: string | null
	price: number | null
	genres: string[]
	cover: boolean
	songs_array: {
		// audio: File
		title: string
		featuring: number[]
		lyrics: string | null
	}[]
}

export class CreateReleaseReplyDTO extends ReplyDTO<string> {}

// MODIFY PRICE
export interface ModifyReleasePriceInputDTO {
	id: ReleaseId
	newAmount: number
}
export class ModifyReleasePriceReplyDTO extends ReplyDTO<boolean> {}

// GET ARTIST
export interface GetReleaseInputDTO {
	id: number
}
export class GetReleaseReplyDTO extends ReplyDTO<IRelease> {}

// GET ALL
export class GetAllReleasesReplyDTO extends ReplyDTO<IRelease[]> {}

// FIND MANY BY GENRE
export interface FindReleasesByGenreInputDTO {
	genre: GenreType
}
export class FindReleasesByGenreReplyDTO extends ReplyDTO<IRelease[]> {}

// FIND MANY BY ARTIST
export interface FindReleasesByArtistInputDTO {
	id: number
}
export class FindReleasesByArtistReplyDTO extends ReplyDTO<IRelease[]> {}
