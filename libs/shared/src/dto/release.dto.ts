import {
	ArtistID,
	GenresArray,
	INewReleaseSucc,
	IReleaseSucc,
	IReleasesListSucc,
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
interface INewSong {
	audio: File
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
	release: INewReleaseData
	songs: INewSong[]

	constructor(release: INewReleaseData, songs: INewSong[]) {
		this.release = release
		this.songs = songs
	}
}
export class ModifyReleaseReplyDTO extends ReplyDTO<boolean> {}

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
