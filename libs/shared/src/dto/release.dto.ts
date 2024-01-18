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

interface INewReleaseData {
	owner_id: ArtistId
	title: string
	releaseType: ReleaseType
	descript: string | null
	price: ReleasePrice | null
	genres: GenresArray
}
interface INewSong {
	// audio: File
	title: string
	featuring: number[]
	lyrics: string | null
}

// CREATE RELEASE
export class CreateReleaseReqDTO {
	release: INewReleaseData
	songs: INewSong[]

	constructor(release: INewReleaseData, songs: INewSong[]) {
		this.release = release
		this.songs = songs
	}
}

export class CreateReleaseReplyDTO extends ReplyDTO<INewReleaseSucc> {}

// MODIFY
export class ModifyReleaseReqDTO {
	id: ReleaseId
	newAmount: ReleasePrice

	constructor(id: ReleaseId, newAmount: ReleasePrice) {
		this.id = id
		this.newAmount = newAmount
	}
}
export class ModifyReleaseReplyDTO extends ReplyDTO<boolean> {}

// HIDE
export class HideReleaseReqDTO {
	id: ReleaseId
	isPublic: boolean

	constructor(id: ReleaseId, isPublic: boolean) {
		this.id = id
		this.isPublic = isPublic
	}
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
