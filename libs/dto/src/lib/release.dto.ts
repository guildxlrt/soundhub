import { ArtistId, GenreType, IRelease, ReleaseId, ReleasePrice, ReleaseType } from "Shared-utils"
import { ReplyDTO } from "../assets"

// CREATE RELEASE
export interface CreateReleaseInputDTO {
	artist_id: ArtistId
	title: string
	releaseType: ReleaseType
	descript: string | null
	price: ReleasePrice | null
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
	newAmount: ReleasePrice
}
export class ModifyReleasePriceReplyDTO extends ReplyDTO<boolean> {}

// GET ARTIST
export interface GetReleaseInputDTO {
	id: ReleaseId
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
	id: ArtistId
}
export class FindReleasesByArtistReplyDTO extends ReplyDTO<IRelease[]> {}
