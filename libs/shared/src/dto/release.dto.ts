import {
	ArtistID,
	GenresArray,
	INewReleaseSucc,
	IRelease,
	IReleaseSucc,
	IReleasesListSucc,
	ISong,
	ReleaseID,
	ReleasePrice,
	ReleaseType,
} from "../utils"
import { ReplyDTO } from "./layers/reply"

interface INewReleaseData {
	owner_id: ArtistID
	title: string
	releaseType: ReleaseType
	descript: string | null
	price: ReleasePrice | null
	genres: GenresArray
}

// CREATE RELEASE
export class CreateReleaseReqDTO {
	release: IRelease
	songs: ISong[]

	constructor(release: IRelease, songs: ISong[]) {
		this.release = release
		this.songs = songs
	}
}

export class CreateReleaseReplyDTO extends ReplyDTO<INewReleaseSucc> {}

// MODIFY
export class EditReleaseReqDTO {
	release: INewReleaseData
	songs: ISong[]

	constructor(release: INewReleaseData, songs: ISong[]) {
		this.release = release
		this.songs = songs
	}
}
export class EditReleaseReplyDTO extends ReplyDTO<boolean> {}

// HIDE
export class HideReleaseReqDTO {
	id: ReleaseID
	isPublic: boolean

	constructor(id: ReleaseID, isPublic: boolean) {
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
export class FindReleasesByGenreReplyDTO extends ReplyDTO<IReleasesListSucc> {}

// FIND MANY BY ARTIST
export class FindReleasesByArtistReplyDTO extends ReplyDTO<IReleasesListSucc> {}
