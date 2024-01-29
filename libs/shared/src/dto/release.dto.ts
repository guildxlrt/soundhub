import { INewReleaseSucc, IReleaseSucc, IReleasesListSucc } from "../replies"
import { GenresArray, ProfileID, ReleaseID, ReleaseType } from "../types"
import { ReplyDTO } from "./layers/reply"

// CREATE RELEASE
export class CreateReleaseReqDTO {
	readonly release: {
		readonly owner_id: ProfileID
		readonly title: string
		readonly releaseType: ReleaseType
		readonly descript: string | null
		readonly price: null | number
		readonly genres: GenresArray
	}
	readonly songs: {
		readonly title: string
		readonly featuring: number[]
		readonly lyrics: string | null
	}[]

	constructor(
		release: {
			owner_id: ProfileID
			title: string
			releaseType: ReleaseType
			descript: string | null
			price: null | number
			genres: GenresArray
		},
		songs: {
			title: string
			featuring: number[]
			lyrics: string | null
		}[]
	) {
		this.release = release
		this.songs = songs
	}
}

export class CreateReleaseReplyDTO extends ReplyDTO<INewReleaseSucc> {}

// MODIFY
export class EditReleaseReqDTO {
	readonly release: {
		readonly id: ReleaseID
		readonly owner_id: ProfileID
		readonly title: string
		readonly releaseType: ReleaseType
		readonly descript: string | null
		readonly price: null | number
		readonly genres: GenresArray
		readonly coverPath: string | null
	}
	readonly songs: {
		readonly id: number
		readonly release_id: ReleaseID
		readonly title: string
		readonly featuring: number[]
		readonly lyrics: string | null
	}[]

	constructor(
		release: {
			id: ReleaseID
			owner_id: ProfileID
			title: string
			releaseType: ReleaseType
			descript: string | null
			price: null | number
			genres: GenresArray
			coverPath: string | null
		},
		songs: {
			id: number
			release_id: ReleaseID
			title: string
			featuring: number[]
			lyrics: string | null
		}[]
	) {
		this.release = release
		this.songs = songs
	}
}
export class EditReleaseReplyDTO extends ReplyDTO<boolean> {}

// HIDE
export class SetPrivStatusReleaseReqDTO {
	readonly id: ReleaseID
	readonly isPublic: boolean

	constructor(id: ReleaseID, isPublic: boolean) {
		this.id = id
		this.isPublic = isPublic
	}
}
export class SetPrivStatusReleaseReplyDTO extends ReplyDTO<boolean> {}

// GET
export class GetReleaseReplyDTO extends ReplyDTO<IReleaseSucc> {}

// GET ALL
export class GetAllReleasesReplyDTO extends ReplyDTO<IReleasesListSucc> {}

// FIND MANY BY GENRE
export class FindReleasesByGenreReplyDTO extends ReplyDTO<IReleasesListSucc> {}

// FIND MANY BY ARTIST
export class FindReleasesByArtistReplyDTO extends ReplyDTO<IReleasesListSucc> {}
