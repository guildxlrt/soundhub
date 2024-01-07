import { ArtistId, GenresArray, ReleaseId, ReleaseType } from "../../types"

// RELEASE
export interface INewReleaseSucc {
	message: string
	id: ReleaseId
}

export interface IReleaseSucc {
	id: ReleaseId
	artist_id: ArtistId
	title: string
	releaseType: ReleaseType
	descript: string | null
	price: number | null
	genres: GenresArray
	songs_list: { audioUrl: string; title: string }[]
	coverUrl: string | null
}
export type IReleasesListSucc = Omit<IReleaseSucc, "descript" | "price" | "songs_list">[]
export type IReleasesListItemSucc = IReleasesListSucc[0]
